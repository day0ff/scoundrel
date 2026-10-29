import assert from "node:assert/strict";
import {getSeededRandom} from "helpers/getSeededRandom.ts";
import {initPasteboard} from "entities/pasteboards/constants.ts";
import {getCardStrength} from "entities/pasteboards/helpers.ts";
import {initPack} from "entities/packs/constants.ts";
import {necromancerPack} from "entities/packs/necromancer.ts";
import {classicPack} from "entities/packs/classic.ts";
import {classifyDungeonRoom} from "entities/dungeon-rooms/helpers.ts";
import type {GameStateType, PlayingCardType} from "entities/game/types.ts";
import {serializeTransform} from "store/serializer.ts";
import reducer, {addCardsToZone, attackCard, skipRoom, startGame, completeEffectAnimation} from "./index.ts";
import {createGame, restoreGame} from "./helpers.ts";
import {createGameLog} from "./log.ts";
import {doesReplayMatchGame} from "./replay.ts";
import {getAttackRejection, resolveAttack} from "./attack.ts";
import {calculateGameScore, calculateScoreRange} from "./score.ts";
import {roomWithAttackFeedbackSelector} from "pages/ClassicGame/components/RoomZone/selectors.ts";
import {cryptWithEffectFeedbackSelector, isConsumingGameSelector} from "./selectors.ts";
import type {RootState} from "store/types.ts";

const thing = () => initPasteboard("day0ff:pasteboard-skeleton.F.thing");
const osteomancer = () => initPasteboard("day0ff:pasteboard-skeleton.F.osteomancer");
const skeleton = (rank: "2" | "3" | "K" = "2") => initPasteboard(`day0ff:pasteboard-skeleton.${rank}`);

const waiting = (cards: PlayingCardType[]): GameStateType => {
    const game = createGame([], getSeededRandom("FOOLS"));
    game.zones.dungeon.cards = structuredClone(cards);
    game.log = createGameLog(game, "newGame");
    return game;
};

const apply = (state: GameStateType, action: Parameters<typeof reducer>[1]) => {
    const next = reducer(state, action);
    assert.ok(next);
    return next;
};

export const runFoolTests = () => {
    const weapon = initPasteboard("day0ff:pasteboard-weapon.T");
    const potion = initPasteboard("day0ff:pasteboard-heal.2");
    const originalThing = thing();
    assert.equal(originalThing.suit, "skeleton");
    assert.equal(osteomancer().suit, "skeleton");
    assert.equal(originalThing.variant, "thing");
    assert.equal(osteomancer().variant, "osteomancer");
    let game = apply(waiting([originalThing, skeleton("3"), skeleton("K"), potion]), startGame());
    const grown = game.zones.room.cards.find(card => card.identifier === originalThing.identifier)!;
    assert.equal(grown.rank, "F");
    assert.equal(grown.strength, 17);
    assert.equal(originalThing.strength, 1);
    assert.equal(game.zones.room.cards.length, 2);
    assert.ok(game.zones.room.cards.some(card => card.id === potion.id));
    assert.equal(game.zones.crypt.cards.length, 2);
    assert.equal(game.roomProgress?.cardsPlayed, 0);
    assert.equal(game.animationSequence, 2);
    assert.equal(game.activeRoomCards?.find(card => card.id === grown.id)?.strength, 17);
    assert.ok(doesReplayMatchGame(game.log!, game));

    const summoner = osteomancer();
    game = apply(waiting([summoner]), startGame());
    assert.equal(game.zones.room.cards.length, 1);
    assert.equal(game.zones.room.cards[0].identifier, originalThing.identifier);
    assert.equal(game.zones.room.cards[0].strength, 15);
    assert.equal(game.zones.crypt.cards[0].id, summoner.id);
    assert.ok(doesReplayMatchGame(game.log!, game));
    game = apply(waiting([osteomancer(), thing(), thing(), skeleton()]), startGame());
    assert.equal(game.zones.room.cards.length, 1);
    assert.equal(game.zones.room.cards[0].strength, 19);
    assert.equal(game.zones.crypt.cards.length, 4);
    assert.ok(doesReplayMatchGame(game.log!, game));

    game = apply(waiting([thing(), skeleton("3")]), startGame());
    game = apply(game, skipRoom());
    assert.equal(game.zones.room.cards[0].strength, 4);
    const arriving = skeleton();
    game = apply(game, addCardsToZone({zone: "room", cards: [arriving]}));
    assert.equal(game.zones.room.cards[0].strength, 4); // The Thing's entry effect does not run again for ordinary arrivals.
    assert.equal(game.zones.room.cards.length, 2);
    assert.equal(arriving.strength, 2);
    assert.equal(game.roomProgress?.cardsPlayed, 0);
    game = apply(game, addCardsToZone({zone: "room", cards: [osteomancer()]}));
    assert.equal(game.zones.room.cards.length, 1);
    assert.equal(game.zones.room.cards[0].strength, 21);
    assert.ok(doesReplayMatchGame(game.log!, game));
    const serialized = serializeTransform.in(game, "game", {});
    const saved = serializeTransform.out(JSON.parse(JSON.stringify(serialized)), "game", {}) as GameStateType;
    const restored = restoreGame(saved);
    assert.equal(restored.zones.room.cards[0].strength, 21);
    assert.equal(restored.zones.crypt.cards.length, game.zones.crypt.cards.length);

    const fight = waiting([]);
    fight.started = true;
    const enemy = {...thing(), strength: 13};
    const stronger = {...thing(), strength: 14};
    fight.zones.room.cards = [enemy, stronger, skeleton("K")];
    fight.zones.weapons.cards.push(weapon);
    fight.zones.weapons.capacity = fight.zones.weapons.cards.length;
    fight.log = createGameLog(fight, "newGame");
    assert.equal(resolveAttack(fight, weapon.id, enemy.id)?.healthDamage, 3);
    const killed = apply(fight, attackCard({cardId: weapon.id, enemyId: enemy.id}));
    const equipped = killed.zones.weapons.cards.find(card => card.id === weapon.id)!;
    assert.equal(killed.hero.health.current, 17);
    assert.equal(equipped.killedEnemies?.[0].strength, 13);
    assert.equal(equipped.killedEnemies?.[0].rank, "F");
    assert.equal(getAttackRejection(killed, weapon.id, stronger.id), undefined);
    assert.ok(resolveAttack(killed, weapon.id, stronger.id));
    assert.equal(getAttackRejection(killed, weapon.id, killed.zones.room.cards.find(card => card.rank === "K")!.id), undefined);
    assert.ok(doesReplayMatchGame(killed.log!, killed));

    assert.equal(getCardStrength({...skeleton(), strength: 7}), 7);
    assert.equal(getCardStrength({rank: "2"}), 2);
    assert.equal(getCardStrength({rank: "F"}), undefined);
    assert.equal(getCardStrength({rank: "F", strength: NaN}), undefined);
    assert.equal(getCardStrength({rank: "F", strength: -1}), undefined);
    assert.equal(classifyDungeonRoom([osteomancer()]).strength, 15);
    assert.equal(classifyDungeonRoom([grown]).strength, 17);
    assert.equal(calculateScoreRange([osteomancer(), thing()], 20).min, -16);
    const defeat = {...killed, outcome: "defeat" as const};
    assert.equal(calculateGameScore(defeat), 17 - 14 - 13);

    const necromancerCards = initPack(necromancerPack.identifier).decks.flatMap(deck => deck.pasteboards);
    assert.equal(necromancerCards.length, 48);
    assert.equal(necromancerCards.filter(card => card.identifier === originalThing.identifier).length, 1);
    assert.equal(necromancerCards.filter(card => card.identifier === summoner.identifier).length, 1);
    assert.equal(initPack(classicPack.identifier).decks.flatMap(deck => deck.pasteboards).length, 46);
    return [
        "Thing absorbs every other room enemy and adds their strength without changing its F rank",
        "Osteomancer summons a Thing that consumes him; multiple Fools resolve deterministically",
        "room re-entry and summoned arrivals resolve once without mutating action payloads",
        "summon IDs and absorbed strength survive save restoration and exact replay",
        "combat damage and weapon kill limits use captured strength rather than rank",
        "room danger and score bounds include explicit strength and summoned enemies",
        "Osteomancer pack contains one of each Fool and Classic keeps its original deck",
    ];
};

export const runSummonTests = () => {
    for (const source of ["dungeon", "discard", "crypt"] as const) {
        const summoner = osteomancer();
        const existing = {...thing(), strength: 23};
        const game = waiting([]);
        game.zones.dungeon.cards = [summoner];
        game.zones[source].cards.push(existing);
        // Leave Thing below the initial deal when it is in the dungeon.
        game.zones.room.capacity = 1;
        game.log = createGameLog(game, "newGame");
        let result = apply(game, startGame());
        assert.equal(result.zones[source].cards.some(card => card.id === existing.id), false);
        assert.equal(result.zones.room.cards[0].id, existing.id);
        assert.equal(result.zones.room.cards[0].strength, 23 + summoner.strength!);
        assert.equal(existing.strength, 23);
        const event = result.animationEvents[0];
        assert.equal(event.animation, "day0ff:animation-summon");
        if (event.animation !== "day0ff:animation-summon") throw new Error("Missing summon event");
        assert.equal(event.summonedId, existing.id);
        assert.equal(event.roomBefore.find(card => card.id === existing.id)?.strength, 23);
        assert.ok(event.roomBefore.some(card => card.id === summoner.id));
        assert.equal(cryptWithEffectFeedbackSelector.resultFunc(result)!.cards.length, 0);
        assert.equal(isConsumingGameSelector({game: result} as RootState), true);
        assert.ok(doesReplayMatchGame(result.log!, result));
        const saved = serializeTransform.out(JSON.parse(JSON.stringify(serializeTransform.in(result, "game", {}))), "game", {}) as GameStateType;
        assert.equal(restoreGame(saved).zones.room.cards[0].strength, 23 + summoner.strength!);
        result = apply(result, completeEffectAnimation(event.id));
        assert.equal(result.animationEvents[0].animation, "day0ff:animation-consume");
        result = apply(result, completeEffectAnimation(result.animationEvents[0].id));
        assert.equal(isConsumingGameSelector({game: result} as RootState), false);
    }

    const game = waiting([]);
    const summoner = osteomancer();
    const dungeonThing = thing();
    const discardThing = thing();
    const cryptThing = thing();
    game.started = true;
    game.zones.dungeon.cards = [dungeonThing];
    game.zones.discard.cards = [discardThing];
    game.zones.crypt.cards = [cryptThing];
    game.log = createGameLog(game, "newGame");
    let result = apply(game, addCardsToZone({zone: "room", cards: [summoner]}));
    assert.equal(result.zones.room.cards[0].id, dungeonThing.id);
    assert.ok(result.zones.discard.cards.some(card => card.id === discardThing.id));
    assert.ok(result.zones.crypt.cards.some(card => card.id === cryptThing.id));
    const withoutDungeon = structuredClone(game);
    withoutDungeon.zones.dungeon.cards = [];
    result = apply(withoutDungeon, addCardsToZone({zone: "room", cards: [summoner]}));
    assert.equal(result.zones.room.cards[0].id, discardThing.id);

    const fallback = apply(waiting([osteomancer()]), startGame());
    assert.equal(fallback.zones.room.cards[0].identifier, thing().identifier);
    assert.equal(fallback.zones.room.cards[0].strength, 1 + osteomancer().strength!);
    assert.equal(fallback.animationEvents[0].animation, "day0ff:animation-summon");
    assert.ok(doesReplayMatchGame(fallback.log!, fallback));
    return [
        "Osteomancer retrieves an existing Thing from dungeon, discard, or crypt with identity and strength preserved",
        "summoning searches dungeon then discard then crypt and creates a deterministic Thing when none exists",
        "summon feedback precedes consumption, blocks input, and survives save restoration and exact replay",
    ];
};

export const runThingWeaponTests = () => {
    const weapon = initPasteboard("day0ff:pasteboard-weapon.T");
    const previousEnemy = skeleton("2");
    weapon.killedEnemies = [{id: previousEnemy.id, identifier: previousEnemy.identifier, rank: previousEnemy.rank, strength: 2}];
    const target = {...thing(), strength: 12};
    const ordinary = skeleton("3");
    const stronger = skeleton("K");
    const fight = waiting([]);
    fight.started = true;
    fight.zones.room.cards = [target, ordinary, stronger];
    fight.zones.weapons.cards.push(weapon);
    fight.zones.weapons.capacity = fight.zones.weapons.cards.length;
    fight.log = createGameLog(fight, "newGame");

    assert.equal(getAttackRejection(fight, weapon.id, ordinary.id), "enemyRankTooHigh");
    assert.equal(resolveAttack(fight, weapon.id, ordinary.id), undefined);
    assert.equal(getAttackRejection(fight, weapon.id, target.id), undefined);
    assert.equal(getAttackRejection(fight, weapon.id), undefined);
    assert.equal(resolveAttack(fight, weapon.id, target.id)?.healthDamage, 2);

    const killed = apply(fight, attackCard({cardId: weapon.id, enemyId: target.id}));
    const equipped = killed.zones.weapons.cards.find(card => card.id === weapon.id)!;
    assert.equal(equipped.killedEnemies?.at(-1)?.strength, 12);
    assert.equal(equipped.durability, weapon.durability! - 1);
    assert.equal(killed.hero.health.current, fight.hero.health.current - 2);
    assert.ok(killed.zones.crypt.cards.some(card => card.id === target.id));
    assert.ok(resolveAttack(killed, weapon.id, ordinary.id));
    assert.equal(getAttackRejection(killed, weapon.id, stronger.id), "enemyRankTooHigh");
    assert.equal(resolveAttack(killed, weapon.id, stronger.id), undefined);
    assert.ok(doesReplayMatchGame(killed.log!, killed));

    const exhausted = structuredClone(fight);
    exhausted.zones.weapons.cards.find(card => card.id === weapon.id)!.durability = 0;
    assert.equal(resolveAttack(exhausted, weapon.id, target.id), undefined);
    return ["Thing bypasses weapon kill limits and sets its strength as the next limit while preserving damage, durability, and replay"];
};

export const runConsumeAnimationTests = () => {
    const consumer = thing();
    const potion = initPasteboard("day0ff:pasteboard-heal.2");
    let game = apply(waiting([consumer, skeleton("3"), osteomancer(), potion]), startGame());
    const summon = game.animationEvents[0];
    assert.equal(summon.animation, "day0ff:animation-summon");
    game = apply(game, completeEffectAnimation(summon.id));
    const events = game.animationEvents;
    assert.equal(events.length, 3);
    assert.ok(events.every(event => event.animation === "day0ff:animation-consume"));
    assert.equal(game.zones.room.cards[0].strength, 5 + osteomancer().strength!);
    assert.equal(game.zones.crypt.cards.length, 3);
    const expectedStrengths = [1, 4, 4 + osteomancer().strength!];
    for (let index = 0; index < events.length; index++) {
        const event = game.animationEvents[0];
        assert.equal(event.animation, "day0ff:animation-consume");
        if (event.animation !== "day0ff:animation-consume") throw new Error("Missing consume event");
        const room = roomWithAttackFeedbackSelector.resultFunc(game)!;
        const crypt = cryptWithEffectFeedbackSelector.resultFunc(game)!;
        assert.equal(room.cards.length, 5 - index);
        assert.ok(room.capacity >= room.cards.length);
        assert.equal(room.cards.find(card => card.id === consumer.id)?.strength, expectedStrengths[index]);
        assert.ok(room.cards.some(card => card.id === event.enemyId));
        assert.equal(crypt.cards.length, index);
        assert.ok(!crypt.cards.some(card => card.id === event.enemyId));
        assert.equal(isConsumingGameSelector({game} as RootState), true);
        assert.equal(apply(game, completeEffectAnimation(event.id + 999)), game);
        game = apply(game, completeEffectAnimation(event.id));
        assert.ok(cryptWithEffectFeedbackSelector.resultFunc(game)!.cards.some(card => card.id === event.enemyId));
    }
    assert.equal(isConsumingGameSelector({game} as RootState), false);
    assert.equal(roomWithAttackFeedbackSelector.resultFunc(game)!.cards[0].strength, 5 + osteomancer().strength!);
    assert.equal(cryptWithEffectFeedbackSelector.resultFunc(game)!.cards.length, 3);
    assert.equal(game.roomProgress?.cardsPlayed, 0);
    assert.equal(game.hero.health.current, game.hero.health.max);
    assert.ok(doesReplayMatchGame(game.log!, game));
    return [
        "consume feedback retains all dealt cards and restores strength before each sequential absorption",
        "consumed cards appear in the crypt only as their queued animations finish",
        "consume animation completion preserves gameplay, health, and exact replay",
    ];
};
