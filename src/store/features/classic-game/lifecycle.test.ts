import assert from "node:assert/strict";
import {configureStore} from "@reduxjs/toolkit";
import {initPasteboard} from "entities/pasteboards/constants.ts";
import {getSeededRandom} from "helpers/getSeededRandom.ts";
import {getInitialClassicGame} from "./constants.ts";
import nullableReducer, {setTime, surrenderGame, startGame, skipRoom, endTurn, moveCard, attackCard, playCard, selectCard, clearEffectAnimations, setClassicGame, setRoomMinimumCardsToPlay, resetDungeon, shuffleDungeon, clearClassicGame} from "./index.ts";
import {canEndRoom, canSkipRoom, checkGameVictory, createClassicGame, getCardMoveRejection} from "./helpers.ts";
import {getGameSnapshot, parseGameLog, stringifyGameLog} from "./log.ts";
import {doesReplayMatchGame, replayGameLog} from "./replay.ts";
import profilesReducer, {createProfile, setCurrentProfileId} from "../profiles";
import {profilesListenerMiddleware} from "../profiles/middleware.ts";
import {rehydrateListenerMiddleware} from "../../middleware.ts";
import {serializeTransform} from "../../serializer.ts";
import {REHYDRATE} from "redux-persist";
import collectionsReducer from "../collections";
import {initialCollectionsState} from "../collections/constants.ts";
import {classicGameListenerMiddleware} from "./middleware.ts";
import type {ClassicGameStateType, PlayingCardType} from "./types.ts";
import type {RankType} from "entities/types.ts";
import {getAttackRejection, resolveAttack} from "./attack.ts";
import {formatRaceTime, parseRaceTime} from "./time.ts";
import {calculateGameScore} from "./score.ts";
import {canDropCardOnTarget, getCardMove} from "pages/ClassicGame/helpers.ts";

const reducer = (state: ClassicGameStateType | undefined, action: Parameters<typeof nullableReducer>[1]) => {
    const next = nullableReducer(state, action);
    assert.ok(next);
    return next;
};

const card = (kind: "weapon" | "heal" | "skeleton", rank: RankType = "2") => initPasteboard(`day0ff:pasteboard-${kind}.${rank}`);

const fixture = (room: PlayingCardType[], dungeon: PlayingCardType[] = [], discard: PlayingCardType[] = []) => {
    const state = createClassicGame([], getSeededRandom("LIFECYCLE"));
    state.started = true;
    state.zones.room.cards = room;
    state.zones.dungeon.cards = dungeon;
    state.zones.discard.cards = discard;
    state.activeRoomCards = structuredClone(room);
    state.roomProgress = {fightStarted: false, cardsPlayed: 0, skipAllowed: true};
    delete state.log;
    return reducer(undefined, setClassicGame(state));
};

const getLog = (state: ClassicGameStateType) => {
    assert.ok(state.log);
    return state.log;
};

const resolveFirst = (state: ClassicGameStateType) => {
    const first = state.zones.room.cards[0];
    assert.ok(first);
    return first.role === "enemy"
        ? reducer(state, attackCard({cardId: state.zones.weapons.cards[0].id, enemyId: first.id}))
        : first.role === "potion"
            ? reducer(state, playCard({cardId: first.id, from: "room"}))
            : reducer(state, moveCard({cardId: first.id, from: "room", to: "crypt"}));
};

export const runClassicGameTests = (include: (name: string) => boolean = () => true) => {
    const passed: string[] = [];
    const check = (name: string, run: () => void) => { if (include(name)) { run(); passed.push(name); } };

    check("race time defaults, restores, resets and does not change replay results", () => {
        let state = fixture([card("skeleton")]);
        assert.equal(state.time, "00:00:00");
        state = reducer(state, setTime("01:02:03"));
        assert.equal(state.time, "01:02:03");
        assert.equal(reducer(state, setClassicGame(state)).time, "01:02:03");
        assert.ok(doesReplayMatchGame(getLog(state), state));
        assert.equal(reducer(state, setTime("00:60:00")).time, "01:02:03");
        const legacy: Partial<ClassicGameStateType> = {...state};
        delete legacy.time;
        assert.equal(reducer(state, setClassicGame(legacy as ClassicGameStateType)).time, "00:00:00");
        assert.equal(reducer(state, resetDungeon()).time, "00:00:00");
        assert.equal(formatRaceTime(parseRaceTime("01:02:03") + 1999), "01:02:04");
        assert.equal(formatRaceTime(360000000), "100:00:00");
    });

    check("score bounds are calculated at initialization and survive play and restoration", () => {
        const initial = createClassicGame([card("skeleton", "K"), card("skeleton", "3"), card("heal", "T")], getSeededRandom("SCORE"));
        assert.deepEqual(initial.scoreRange, {min: -16, max: initial.hero.health.max + 10});
        const started = reducer(initial, startGame());
        const played = resolveFirst(started);
        assert.deepEqual(played.scoreRange, initial.scoreRange);
        assert.deepEqual(reducer(undefined, setClassicGame(played)).scoreRange, initial.scoreRange);
    });

    check("defeat score counts every unfinished monster and excludes killed monsters and potions", () => {
        const state = fixture([card("skeleton", "2"), card("heal", "T")], [card("skeleton", "K")], [card("skeleton", "4")]);
        state.hero.health.current = 0;
        state.outcome = "defeat";
        state.zones.crypt.cards.push(card("skeleton", "A"));
        assert.equal(calculateGameScore(state), -19);
    });

    check("victory score adds the last potion value only at full life", () => {
        let state = fixture([card("heal", "T")]);
        state = resolveFirst(state);
        state = reducer(state, endTurn());
        assert.equal(state.outcome, "victory");
        assert.equal(calculateGameScore(state), state.hero.health.max + 10);
        state = structuredClone(state);
        state.hero.health.current = 19;
        assert.equal(calculateGameScore(state), 19);
        state.hero.health.current = state.hero.health.max;
        state.lastPlayedCard = {role: "enemy", rank: "2"};
        assert.equal(calculateGameScore(state), state.hero.health.max);
    });

    check("victory score includes the highest held potion at full life after playing a weapon", () => {
        const base = structuredClone(fixture([card("weapon")]));
        base.hero.health.current = base.hero.health.max;
        base.zones.potions.cards = [card("heal", "3"), card("heal", "T")];
        let state = reducer(undefined, setClassicGame(base));
        state = reducer(state, moveCard({cardId: state.zones.room.cards[0].id, from: "room", to: "weapons"}));
        assert.equal(state.outcome, "victory");
        assert.equal(state.lastPlayedCard?.role, "weapon");
        assert.equal(calculateGameScore(state), state.hero.health.max + 10);
        assert.equal(calculateGameScore(reducer(undefined, setClassicGame(state))), state.hero.health.max + 10);

        const changed = structuredClone(state);
        changed.lastPlayedCard = {role: "potion", rank: "4"};
        assert.equal(calculateGameScore(changed), changed.hero.health.max + 10);
        changed.hero.health.current = changed.hero.health.max - 1;
        assert.equal(calculateGameScore(changed), changed.hero.health.current);
        changed.hero.health.current = 0;
        changed.outcome = "defeat";
        assert.equal(calculateGameScore(changed), 0);
    });

    check("empty games stay null until explicitly created and can be cleared", () => {
        assert.equal(nullableReducer(undefined, {type: "init"}), null);
        for (const action of [startGame(), endTurn(), skipRoom(), shuffleDungeon(), clearEffectAnimations()]) {
            assert.equal(nullableReducer(null, action), null);
        }
        const preview = nullableReducer(null, resetDungeon());
        assert.ok(preview);
        assert.equal(preview.started, false);
        assert.equal(nullableReducer(preview, clearClassicGame()), null);
        assert.equal(nullableReducer(preview, setClassicGame(null)), null);
        assert.equal(createProfile("New player").payload.classicGame, null);
    });

    check("persisted games restore exactly and clearing survives reload and profile switches", () => {
        const initial = getInitialClassicGame();
        const rootStore = configureStore({
            reducer: {classicGame: nullableReducer, profiles: profilesReducer, collections: collectionsReducer},
            preloadedState: {
                classicGame: initial,
                profiles: {currentProfileId: "saved", profiles: [
                    {profileId: "saved", name: "Saved", collections: initialCollectionsState, classicGame: initial},
                    {profileId: "empty", name: "Empty", collections: initialCollectionsState, classicGame: null},
                ]},
            },
            middleware: getDefault => getDefault({serializableCheck: false}).concat(
                classicGameListenerMiddleware.middleware, profilesListenerMiddleware.middleware, rehydrateListenerMiddleware.middleware),
        });
        rootStore.dispatch(startGame());
        rootStore.dispatch(skipRoom());
        rootStore.dispatch(clearEffectAnimations());
        const saved = rootStore.getState().classicGame;
        assert.ok(saved);
        const serialized = serializeTransform.in(saved, "classicGame", {});
        const restored = serializeTransform.out(JSON.parse(JSON.stringify(serialized)), "classicGame", {});
        rootStore.dispatch(setCurrentProfileId("empty"));
        assert.equal(rootStore.getState().classicGame, null);
        rootStore.dispatch(setCurrentProfileId("saved"));
        assert.equal(stringifyGameLog(rootStore.getState().classicGame), stringifyGameLog(saved));
        rootStore.dispatch(setClassicGame(restored));
        rootStore.dispatch({type: REHYDRATE, key: "root"});
        assert.equal(stringifyGameLog(rootStore.getState().classicGame), stringifyGameLog(saved));
        assert.ok(doesReplayMatchGame(getLog(saved), saved));
        rootStore.dispatch(clearClassicGame());
        assert.equal(rootStore.getState().profiles.profiles[0].classicGame, null);
        rootStore.dispatch({type: REHYDRATE, key: "root"});
        rootStore.dispatch(setCurrentProfileId("empty"));
        rootStore.dispatch(setCurrentProfileId("saved"));
        assert.equal(rootStore.getState().classicGame, null);
    });

    check("start deals four cards and logs a complete initial snapshot", () => {
        const before = getInitialClassicGame();
        const state = reducer(before, startGame());
        assert.equal(state.zones.room.cards.length, 4);
        assert.equal(state.zones.dungeon.cards.length, before.zones.dungeon.cards.length - 4);
        assert.deepEqual(getLog(state).initialState, getGameSnapshot(before));
        assert.equal(getLog(state).entries.length, 1);
        assert.ok(doesReplayMatchGame(getLog(state), state));
    });

    check("skip routes all cards to Discard and prevents consecutive skips", () => {
        const room = [card("weapon"), card("heal"), card("skeleton"), card("weapon")];
        let state = fixture(room, [card("skeleton"), card("weapon"), card("heal"), card("skeleton")]);
        state = reducer(state, skipRoom());
        assert.deepEqual(state.zones.discard.cards.map(item => item.id), room.map(item => item.id));
        assert.equal(canSkipRoom(state), false);
        assert.equal(reducer(state, skipRoom()), state);
        for (let count = 0; count < 3; count++) state = resolveFirst(state);
        state = reducer(state, endTurn());
        assert.equal(canSkipRoom(state), true);
        assert.ok(doesReplayMatchGame(getLog(state), state));
    });

    check("first room play hides skip, rejects an early end, and three plays unlock it", () => {
        let state = fixture([card("skeleton"), card("skeleton"), card("skeleton"), card("skeleton")]);
        assert.equal(reducer(state, endTurn()), state);
        state = resolveFirst(state);
        assert.equal(state.roomProgress?.fightStarted, true);
        assert.equal(canSkipRoom(state), false);
        assert.equal(canEndRoom(state), false);
        state = resolveFirst(state);
        assert.equal(canEndRoom(state), false);
        state = resolveFirst(state);
        assert.equal(state.roomProgress?.cardsPlayed, 3);
        assert.equal(canEndRoom(state), true);
    });

    check("stored potion use commits to fighting without counting a room card", () => {
        const base = structuredClone(fixture([card("skeleton"), card("weapon"), card("heal"), card("skeleton")]));
        base.zones.potions.cards = [card("heal")];
        delete base.log;
        let state = reducer(undefined, setClassicGame(base));
        state = reducer(state, playCard({cardId: state.zones.potions.cards[0].id, from: "potions"}));
        assert.equal(state.roomProgress?.fightStarted, true);
        assert.equal(state.roomProgress?.cardsPlayed, 0);
        assert.equal(canEndRoom(state), false);
        assert.equal(canSkipRoom(state), false);
        assert.ok(doesReplayMatchGame(getLog(state), state));
    });

    check("only the first potion in a room has an effect across clicks, drags, and saves", () => {
        for (const firstFrom of ["room", "potions"] as const) {
            const roomPotions = [card("heal"), card("heal")];
            const storedPotions = [card("heal"), card("heal")];
            const base = structuredClone(fixture(roomPotions, [card("heal"), card("skeleton")]));
            base.hero.health.current = 5;
            base.zones.potions.cards = storedPotions;
            delete base.log;
            let state = reducer(undefined, setClassicGame(base));
            const first = firstFrom === "room" ? roomPotions[0] : storedPotions[0];
            state = reducer(state, playCard({cardId: first.id, from: firstFrom}));
            assert.equal(state.hero.health.current, 7);
            assert.equal(state.roomProgress?.potionsPlayed, 1);
            state = reducer(state, setClassicGame(state));
            const animations = state.animationSequence;
            for (const potion of storedPotions.filter(item => item.id !== first.id)) {
                state = reducer(state, moveCard({cardId: potion.id, from: "potions", to: "room"}));
                assert.equal(state.hero.health.current, 7);
                assert.ok(state.zones.crypt.cards.some(item => item.id === potion.id));
            }
            for (const potion of roomPotions.filter(item => item.id !== first.id)) {
                state = reducer(state, playCard({cardId: potion.id, from: "room"}));
                assert.equal(state.hero.health.current, 7);
            }
            assert.equal(state.animationSequence, animations);
            assert.equal(state.roomProgress?.cardsPlayed, 2);
            assert.equal(state.zones.crypt.cards.length, 4);
            assert.ok(doesReplayMatchGame(getLog(state), state));
            state = reducer(state, endTurn());
            assert.equal(state.roomProgress?.potionsPlayed, undefined);
            state = reducer(state, playCard({cardId: state.zones.room.cards[0].id, from: "room"}));
            assert.equal(state.hero.health.current, 9);
            assert.ok(doesReplayMatchGame(getLog(state), state));
        }
    });

    check("the potions zone configures how many potions have an effect", () => {
        for (const limit of [0, 1, 2]) {
            const base = structuredClone(fixture([card("heal"), card("heal"), card("heal")]));
            base.hero.health.current = 5;
            base.zones.potions.maximumPotionsPerRoom = limit;
            delete base.log;
            let state = reducer(undefined, setClassicGame(base));
            for (let count = 0; count < 3; count++) state = resolveFirst(state);
            assert.equal(state.hero.health.current, 5 + 2 * limit);
            assert.equal(state.roomProgress?.potionsPlayed, 3);
            assert.equal(state.zones.crypt.cards.length, 3);
            assert.ok(doesReplayMatchGame(getLog(state), state));
        }
    });

    check("saved potion flags migrate to counts and missing limits default to one", () => {
        const base = structuredClone(fixture([card("heal")]));
        base.hero.health.current = 5;
        delete (base.zones.potions as Partial<typeof base.zones.potions>).maximumPotionsPerRoom;
        base.roomProgress = {fightStarted: true, cardsPlayed: 0, skipAllowed: true, potionPlayed: true};
        delete base.log;
        let state = reducer(undefined, setClassicGame(base));
        assert.equal(state.zones.potions.maximumPotionsPerRoom, 1);
        assert.equal(state.roomProgress?.potionsPlayed, 1);
        assert.equal(state.roomProgress?.potionPlayed, undefined);
        state = resolveFirst(state);
        assert.equal(state.hero.health.current, 5);
    });

    check("a potion at full health still uses the room allowance", () => {
        const base = structuredClone(fixture([card("heal"), card("skeleton"), card("heal")]));
        const maximum = base.hero.health.max;
        base.hero.health.current = maximum;
        delete base.log;
        let state = reducer(undefined, setClassicGame(base));
        state = resolveFirst(state);
        assert.equal(state.hero.health.current, maximum);
        state = resolveFirst(state);
        const damagedHealth = state.hero.health.current;
        assert.ok(damagedHealth < maximum);
        state = resolveFirst(state);
        assert.equal(state.hero.health.current, damagedHealth);
        assert.equal(state.roomProgress?.cardsPlayed, 3);
        assert.ok(doesReplayMatchGame(getLog(state), state));
    });

    check("equipping, replacement, stored weapon attacks, and reordering count correctly", () => {
        let state = fixture([card("weapon"), card("weapon"), card("weapon"), card("skeleton")]);
        const roomBefore = state.zones.room.cards.length;
        state = reducer(state, moveCard({cardId: state.zones.room.cards[0].id, from: "room", to: "room", targetCardId: state.zones.room.cards[1].id}));
        assert.equal(state.roomProgress?.fightStarted, false);
        assert.equal(state.zones.room.cards.length, roomBefore);
        for (let count = 0; count < 2; count++) state = reducer(state, moveCard({cardId: state.zones.room.cards[0].id, from: "room", to: "weapons"}));
        const replaced = state.zones.weapons.cards.find(item => item.role === "weapon");
        assert.ok(replaced);
        state = reducer(state, moveCard({cardId: state.zones.room.cards[0].id, from: "room", to: "weapons", targetCardId: replaced.id}));
        assert.equal(state.zones.crypt.cards.some(item => item.id === replaced.id), true);
        assert.equal(state.roomProgress?.cardsPlayed, 3);
        const weapon = state.zones.weapons.cards.find(item => item.role === "weapon");
        assert.ok(weapon);
        state = reducer(state, attackCard({cardId: weapon.id}));
        assert.equal(state.roomProgress?.cardsPlayed, 4);
        assert.equal(state.outcome, "victory");
        assert.equal(canEndRoom(state), false);
        assert.ok(doesReplayMatchGame(getLog(state), state));
    });

    check("enemy drops require an equipped weapon or fist instead of weapon zone empty space", () => {
        const enemy = card("skeleton");
        const weapon = card("weapon");
        const state = structuredClone(fixture([enemy, weapon]));
        const fist = state.zones.weapons.cards.find(item => item.role === "fist");
        assert.ok(fist);
        assert.equal(getCardMove(state, enemy.id, "weapons"), undefined);
        assert.equal(getCardMove(state, enemy.id, "weapons:empty:1"), undefined);
        assert.equal(canDropCardOnTarget(state, enemy.id, fist.id), true);
        assert.equal(getCardMove(state, weapon.id, "weapons:empty:1")?.to, "weapons");
        state.zones.weapons.cards.push(weapon);
        state.zones.room.cards = [enemy];
        assert.equal(canDropCardOnTarget(state, enemy.id, weapon.id), true);
        assert.equal(getCardMove(state, enemy.id, weapon.id)?.targetCardId, weapon.id);
        assert.equal(getCardMove(state, enemy.id, "weapons:empty:2"), undefined);
    });

    check("equipped attackers require an enemy drop target while potions accept room background", () => {
        const enemy = card("skeleton");
        const roomWeapon = card("weapon");
        const weapon = card("weapon");
        const potion = card("heal");
        const state = structuredClone(fixture([enemy, roomWeapon]));
        state.zones.weapons.cards.push(weapon);
        state.zones.potions.cards.push(potion);
        const fist = state.zones.weapons.cards.find(item => item.role === "fist");
        assert.ok(fist);
        for (const attacker of [weapon, fist]) {
            assert.equal(getCardMove(state, attacker.id, "room"), undefined);
            assert.equal(getCardMove(state, attacker.id, roomWeapon.id), undefined);
            assert.equal(getCardMove(state, attacker.id, enemy.id)?.targetCardId, enemy.id);
            assert.equal(canDropCardOnTarget(state, attacker.id, enemy.id), true);
        }
        const potionMove = getCardMove(state, potion.id, "room");
        assert.deepEqual(potionMove, {cardId: potion.id, from: "potions", to: "room", targetCardId: undefined});
        assert.equal(getCardMoveRejection(state, potionMove!), undefined);
        assert.equal(getCardMove(state, roomWeapon.id, "room")?.to, "room");
    });

    check("weapons track equal and descending kills and reject higher ranks without changes", () => {
        const enemies = [card("skeleton", "K"), card("skeleton", "Q"), card("skeleton", "K"), card("skeleton", "Q"), card("skeleton", "J")];
        const weapon = card("weapon", "K");
        const base = structuredClone(fixture(enemies));
        base.zones.weapons.cards.push(weapon);
        delete base.log;
        let state = reducer(undefined, setClassicGame(base));
        for (const enemy of enemies.slice(0, 2)) state = reducer(state, attackCard({cardId: weapon.id, enemyId: enemy.id}));
        assert.equal(resolveAttack(state, weapon.id, enemies[2].id), undefined);
        assert.equal(getAttackRejection(state, weapon.id, enemies[2].id), "enemyRankTooHigh");
        assert.equal(getAttackRejection(state, weapon.id), "enemyRankTooHigh");
        assert.equal(getAttackRejection(state, weapon.id, enemies[3].id), undefined);
        assert.equal(getAttackRejection(state, weapon.id, enemies[4].id), undefined);
        assert.equal(getCardMoveRejection(state, {cardId: weapon.id, from: "weapons", to: "room", targetCardId: enemies[2].id}), "enemyRankTooHigh");
        assert.equal(getCardMoveRejection(state, {cardId: weapon.id, from: "weapons", to: "room"}), "enemyRankTooHigh");
        assert.equal(getCardMoveRejection(state, {cardId: enemies[2].id, from: "room", to: "weapons", targetCardId: weapon.id}), "enemyRankTooHigh");
        for (const action of [
            attackCard({cardId: weapon.id, enemyId: enemies[2].id}),
            attackCard({cardId: weapon.id}),
            moveCard({cardId: weapon.id, from: "weapons", to: "room", targetCardId: enemies[2].id}),
            moveCard({cardId: enemies[2].id, from: "room", to: "weapons", targetCardId: weapon.id}),
        ]) assert.equal(reducer(state, action), state);
        state = reducer(state, moveCard({cardId: enemies[3].id, from: "room", to: "weapons", targetCardId: weapon.id}));
        state = reducer(state, moveCard({cardId: weapon.id, from: "weapons", to: "room", targetCardId: enemies[4].id}));
        const broken = state.zones.crypt.cards.find(item => item.id === weapon.id);
        assert.ok(broken);
        assert.equal(broken.durability, 0);
        assert.deepEqual(broken.killedEnemies, [enemies[0], enemies[1], enemies[3], enemies[4]].map(enemy => ({
            id: enemy.id, identifier: enemy.identifier, rank: enemy.rank,
        })));
        assert.equal(state.zones.room.cards[0].id, enemies[2].id);
        assert.equal(state.roomProgress?.cardsPlayed, 4);
        assert.ok(doesReplayMatchGame(getLog(state), state));
    });

    check("weapon histories survive rooms and saves while fresh weapons and fists are unrestricted", () => {
        const weapon = card("weapon", "K");
        const fresh = card("weapon", "K");
        const base = structuredClone(fixture([card("skeleton")], [card("skeleton", "K"), card("skeleton", "K")]));
        base.zones.weapons.cards.push(weapon, fresh);
        delete base.log;
        let state = reducer(undefined, setClassicGame(base));
        state = reducer(state, attackCard({cardId: weapon.id}));
        state = reducer(state, endTurn());
        state = reducer(state, setClassicGame(state));
        assert.equal(state.zones.weapons.cards.find(item => item.id === weapon.id)?.killedEnemies?.[0].rank, "2");
        assert.equal(reducer(state, attackCard({cardId: weapon.id})), state);
        state = reducer(state, attackCard({cardId: fresh.id}));
        assert.equal(state.zones.weapons.cards.find(item => item.id === fresh.id)?.killedEnemies?.[0].rank, "K");
        const fist = state.zones.weapons.cards[0];
        state = reducer(state, attackCard({cardId: fist.id}));
        assert.equal(state.zones.room.cards.length, 0);
        assert.equal(state.zones.weapons.cards[0].killedEnemies, undefined);
        assert.ok(doesReplayMatchGame(getLog(state), state));
    });

    check("short rooms need emptying while enemies remain and can be skipped", () => {
        for (const size of [1, 2]) {
            let state = fixture(Array.from({length: size}, () => card("skeleton")));
            assert.equal(canSkipRoom(state), true);
            assert.equal(canEndRoom(state), false);
            for (let count = 0; count < size; count++) {
                state = resolveFirst(state);
                assert.equal(canEndRoom(state), false);
                assert.equal(state.outcome, count === size - 1 ? "victory" : undefined);
            }
        }
    });

    check("room threshold is configurable and no enemies also unlocks end turn", () => {
        let state = fixture([card("skeleton"), card("skeleton"), card("weapon"), card("heal")]);
        state = reducer(state, setRoomMinimumCardsToPlay(1));
        state = resolveFirst(state);
        assert.equal(canEndRoom(state), true);
        state = reducer(state, setRoomMinimumCardsToPlay(5));
        assert.equal(canEndRoom(state), false);
        state = resolveFirst(state);
        assert.equal(state.zones.room.cards.length, 2);
        assert.equal(canEndRoom(state), true);
        assert.equal(reducer(state, setRoomMinimumCardsToPlay(-1)), state);
        assert.ok(doesReplayMatchGame(getLog(state), state));
    });

    check("end turn routes leftovers, deals a partial room, and keeps Discard until Dungeon empties", () => {
        let state = fixture([card("skeleton"), card("weapon"), card("heal")], [card("weapon"), card("heal")]);
        state = reducer(state, setRoomMinimumCardsToPlay(0));
        const seed = {...state.seed};
        state = reducer(state, endTurn());
        assert.equal(state.zones.room.cards.length, 2);
        assert.equal(state.zones.discard.cards.length, 1);
        assert.equal(state.zones.crypt.cards.length, 2);
        assert.deepEqual(state.seed, seed);
        assert.equal(state.turnNumber, 2);
        assert.ok(doesReplayMatchGame(getLog(state), state));
    });

    check("recycling shuffles deterministically and conserves every card", () => {
        const base = fixture([card("skeleton"), card("weapon"), card("heal")], [], [card("skeleton"), card("weapon"), card("heal"), card("skeleton")]);
        const beforeIds = Object.values(base.zones).flatMap(zone => zone.cards.map(item => item.id)).sort();
        const configured = reducer(base, setRoomMinimumCardsToPlay(0));
        const state = reducer(configured, endTurn());
        const duplicate = reducer(structuredClone(configured), endTurn());
        assert.deepEqual(getGameSnapshot(state), getGameSnapshot(duplicate));
        assert.ok(state.seed.step > base.seed.step);
        assert.equal(state.zones.discard.cards.length, 0);
        assert.deepEqual(Object.values(state.zones).flatMap(zone => zone.cards.map(item => item.id)).sort(), beforeIds);
        assert.ok(doesReplayMatchGame(getLog(state), state));
    });

    check("defeat takes priority, blocks moves, survives restoration, and can restart", () => {
        const base = structuredClone(fixture([card("skeleton")]));
        base.hero.health.current = 1;
        base.zones.potions.cards = [card("heal")];
        delete base.log;
        let state = reducer(undefined, setClassicGame(base));
        state = resolveFirst(state);
        assert.equal(state.outcome, "defeat");
        assert.equal(state.hero.health.current, 0);
        for (const action of [endTurn(), skipRoom(), shuffleDungeon(), playCard({cardId: state.zones.potions.cards[0].id, from: "potions"})]) assert.equal(reducer(state, action), state);
        state = reducer(state, setClassicGame(state));
        assert.equal(state.outcome, "defeat");
        assert.ok(doesReplayMatchGame(getLog(state), state));
        const reset = reducer(state, resetDungeon());
        assert.equal(reset.outcome, undefined);
        assert.equal(getLog(reset).entries.length, 0);
        for (const health of [0, -1]) {
            const saved = structuredClone(base);
            saved.hero.health.current = health;
            assert.equal(reducer(undefined, setClassicGame(saved)).outcome, "defeat");
        }
    });

    check("victory is immediate after the last enemy and leftover enemies recycle instead", () => {
        let state = fixture([card("skeleton")]);
        state = resolveFirst(state);
        assert.equal(state.outcome, "victory");
        assert.ok(doesReplayMatchGame(getLog(state), state));
        assert.equal(reducer(state, endTurn()), state);
        state = fixture([card("skeleton")]);
        state = reducer(state, setRoomMinimumCardsToPlay(0));
        state = reducer(state, endTurn());
        assert.equal(state.outcome, undefined);
        assert.equal(state.zones.room.cards[0].role, "enemy");
    });

    check("victory requires all three encounter zones empty and positive health", () => {
        for (const zone of ["dungeon", "discard", "room"] as const) {
            const state = createClassicGame([], getSeededRandom("VICTORY"));
            state.started = true;
            state.zones[zone].cards = [card("skeleton")];
            checkGameVictory(state);
            assert.equal(state.outcome, undefined, zone);
            state.zones[zone].cards = [];
            state.selectedCardId = state.zones.weapons.cards[0].id;
            checkGameVictory(state);
            assert.equal(state.outcome, "victory");
            assert.equal(state.selectedCardId, undefined);
        }
        for (const health of [0, -1]) {
            const state = createClassicGame([], getSeededRandom("DEFEAT"));
            state.started = true;
            state.hero.health.current = health;
            checkGameVictory(state);
            assert.equal(state.outcome, "defeat");
        }
        const preview = createClassicGame([], getSeededRandom("PREVIEW"));
        checkGameVictory(preview);
        assert.equal(preview.outcome, undefined);
        assert.equal(reducer(preview, startGame()).outcome, "victory");
    });

    check("playing or equipping the final room card wins immediately and replays correctly", () => {
        for (const kind of ["heal", "weapon"] as const) {
            const initial = fixture([card(kind)]);
            const finalCard = initial.zones.room.cards[0];
            const state = kind === "heal"
                ? reducer(initial, playCard({cardId: finalCard.id, from: "room"}))
                : reducer(initial, moveCard({cardId: finalCard.id, from: "room", to: "weapons"}));
            assert.equal(state.outcome, "victory");
            assert.ok(doesReplayMatchGame(getLog(state), state));
            assert.equal(reducer(undefined, setClassicGame(state)).outcome, "victory");
        }
    });

    check("full, partial, JSON-exported and resumed replays reproduce gameplay", () => {
        let state = createClassicGame(Array.from({length: 12}, (_,index) => card((["skeleton", "weapon", "heal"] as const)[index % 3])), getSeededRandom("REPLAY"));
        state = reducer(state, startGame());
        state = reducer(state, skipRoom());
        state = reducer(state, setRoomMinimumCardsToPlay(1));
        const initial = stringifyGameLog(getLog(state).initialState);
        for (let count = 0; count < 50 && !state.outcome; count++) {
            state = canEndRoom(state) && state.roomProgress?.fightStarted ? reducer(state, endTurn()) : resolveFirst(state);
            assert.ok(doesReplayMatchGame(getLog(state), state));
            if (count === 3) state = reducer(state, setClassicGame(state));
        }
        assert.equal(state.outcome, "victory");
        const log = getLog(state);
        assert.equal(stringifyGameLog(log.initialState), initial);
        assert.equal(replayGameLog(log, 0).started, false);
        assert.equal(replayGameLog(log).log, undefined);
        const decoded = parseGameLog(stringifyGameLog(log));
        assert.equal(decoded.initialState.zones.dungeon.capacity, Infinity);
        assert.ok(doesReplayMatchGame(decoded, state));
        const entries = log.entries.length;
        state = reducer(state, clearEffectAnimations());
        assert.equal(getLog(state).entries.length, entries);
        assert.ok(doesReplayMatchGame(getLog(state), state));
        assert.throws(() => replayGameLog(log, -1));
    });

    check("save migration fills defaults and begins logging at the restored state", () => {
        const old = structuredClone(fixture([card("skeleton"), card("heal")])) as Partial<ClassicGameStateType>;
        delete old.log;
        delete old.roomProgress;
        const zones = old.zones;
        assert.ok(zones);
        const room = zones.room as Partial<typeof zones.room>;
        delete room.minimumCardsToPlay;
        let state = reducer(undefined, setClassicGame(old as ClassicGameStateType));
        assert.equal(state.zones.room.minimumCardsToPlay, 3);
        assert.equal(getLog(state).origin, "restoredGame");
        assert.equal(getLog(state).entries.length, 0);
        state = resolveFirst(state);
        assert.ok(doesReplayMatchGame(getLog(state), state));
        const entries = getLog(state).entries.length;
        state = reducer(state, selectCard(state.zones.room.cards[0].id));
        assert.equal(getLog(state).entries.length, entries);
        assert.ok(doesReplayMatchGame(getLog(state), state));
    });

    check("store listeners save the logged state to the active profile", () => {
        const initial = getInitialClassicGame();
        const rootStore = configureStore({
            reducer: {classicGame: reducer, profiles: profilesReducer},
            preloadedState: {
                classicGame: initial,
                profiles: {
                    currentProfileId: "test-profile",
                    profiles: [{profileId: "test-profile", name: "Test", collections: initialCollectionsState, classicGame: initial}],
                },
            },
            middleware: getDefault => getDefault({serializableCheck: false}).concat(classicGameListenerMiddleware.middleware),
        });
        rootStore.dispatch(startGame());
        const saved = rootStore.getState().profiles.profiles[0].classicGame;
        assert.ok(saved);
        assert.equal(getLog(saved).entries.length, 1);
        assert.ok(doesReplayMatchGame(getLog(saved), saved));
    });

    check("stored potions cannot be dropped onto room potions", () => {
        const roomPotion = card("heal");
        const enemy = card("skeleton");
        const storedPotion = card("heal");
        const state = structuredClone(fixture([roomPotion, enemy]));
        state.zones.potions.cards = [storedPotion];

        const rejected = reducer(state, moveCard({
            cardId: storedPotion.id, from: "potions", to: "room", targetCardId: roomPotion.id,
        }));
        assert.equal(rejected, state);

        const played = reducer(state, moveCard({
            cardId: storedPotion.id, from: "potions", to: "room", targetCardId: enemy.id,
        }));
        assert.ok(played.zones.crypt.cards.some(item => item.id === storedPotion.id));
        assert.ok(played.zones.room.cards.some(item => item.id === roomPotion.id));
    });

    check("surrender ends an active game and survives replay and restoration", () => {
        const state = fixture([card("skeleton")]);
        const selected = reducer(state, selectCard(state.zones.room.cards[0].id));
        const surrendered = reducer(selected, surrenderGame());
        assert.equal(surrendered.outcome, "defeat");
        assert.equal(surrendered.selectedCardId, undefined);
        assert.deepEqual(surrendered.animationEvents, []);
        assert.ok(doesReplayMatchGame(getLog(surrendered), surrendered));
        assert.equal(reducer(undefined, setClassicGame(surrendered)).outcome, "defeat");
        assert.equal(reducer(surrendered, surrenderGame()), surrendered);
        assert.equal(reducer(surrendered, endTurn()), surrendered);
        assert.equal(nullableReducer(null, surrenderGame()), null);
        const preview = getInitialClassicGame();
        assert.equal(reducer(preview, surrenderGame()), preview);
    });

    return passed;
};
