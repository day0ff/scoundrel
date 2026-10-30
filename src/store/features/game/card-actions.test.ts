import {pendingSummonsGameSelector} from "./selectors.ts";
import {BASE_URL} from "constants.ts";
import {arrivingCardSelector} from "pages/ClassicGame/components/EffectAnimations/selectors.ts";
import {getPasteboardActions} from "entities/pasteboards/constants.ts";
import {applyAttack} from "./attack.ts";
import assert from "node:assert/strict";
import {getSeededRandom} from "helpers/getSeededRandom.ts";
import {initPasteboard} from "entities/pasteboards/constants.ts";
import {getEncounterStrength} from "entities/pasteboards/encounters.ts";
import {necromancerPasteboard} from "entities/pasteboards/skeleton/Necromancer.ts";
import {roomEntryPhase} from "entities/phases/roomEntry.ts";
import {beforeTurnEndPhase} from "entities/phases/beforeTurnEnd.ts";
import {turnEndPhase} from "entities/phases/turnEnd.ts";
import type {PlayingCardType} from "entities/game/types.ts";
import {createGame, dealNextRoom} from "./helpers.ts";
import {roomWithAttackFeedbackSelector} from "pages/ClassicGame/components/RoomZone/selectors.ts";
import {resolvePasteboardActions} from "./card-actions.ts";
import reducer, {startGame, endTurn, advancePhase, completeEffectAnimation} from "./index.ts";
import {createGameLog} from "./log.ts";
import {doesReplayMatchGame} from "./replay.ts";

const makeGame = (cards: PlayingCardType[]) => {
    const game = createGame([], getSeededRandom("CARD-ACTIONS"));
    game.zones.room.cards = cards;
    return game;
};

export const runDrainPotionTests = () => {
    const queen = initPasteboard("day0ff:pasteboard-skeleton.Q.skeletonQueen");
    const roomPotion = initPasteboard("day0ff:pasteboard-heal.2");
    const equippedPotion = initPasteboard("day0ff:pasteboard-heal.3");
    const untouched = initPasteboard("day0ff:pasteboard-weapon.2");
    const drainGame = makeGame([queen, roomPotion, untouched]);
    drainGame.zones.potions.cards = [equippedPotion];
    drainGame.selectedCardId = equippedPotion.id;
    const health = {...drainGame.hero.health};
    resolvePasteboardActions(drainGame, roomEntryPhase.identifier, [queen]);
    assert.deepEqual(drainGame.zones.room.cards, [queen, untouched]);
    assert.deepEqual(drainGame.zones.potions.cards, []);
    assert.deepEqual(drainGame.zones.crypt.cards, [roomPotion, equippedPotion]);
    assert.deepEqual(drainGame.hero.health, health);
    assert.equal(drainGame.selectedCardId, undefined);
    assert.equal(drainGame.animationEvents.length, 1);
    const drain = drainGame.animationEvents[0];
    assert.ok(drain.animation === "day0ff:animation-drain");
    assert.equal(drain.drainerId, queen.id);
    assert.equal(drain.animationCardId, queen.id);
    assert.deepEqual(drain.actionAnimation, queen.actions?.[0].animation);
    assert.deepEqual(drain.potionIds, [roomPotion.id, equippedPotion.id]);
    assert.deepEqual(roomWithAttackFeedbackSelector.resultFunc(drainGame)!.cards, [queen, roomPotion, untouched]);
    resolvePasteboardActions(drainGame, roomEntryPhase.identifier, [queen]);
    assert.equal(drainGame.animationEvents.length, 1);

    return ["Skeleton Queen drains room and equipped potions together without healing and preserves animation snapshots"];
};

export const runCardActionTests = () => {
    runDrainPotionTests();
    runEggHatchTests();
    const king = initPasteboard("day0ff:pasteboard-skeleton.K.skeletonKing");
    const weak = initPasteboard("day0ff:pasteboard-skeleton.2");
    const strong = {...initPasteboard("day0ff:pasteboard-skeleton.3"), strength: 20};
    const tied = {...initPasteboard("day0ff:pasteboard-skeleton.A"), strength: 20};
    const weapon = {...initPasteboard("day0ff:pasteboard-weapon.T"), strength: 100};
    const kingGame = makeGame([king]);
    kingGame.zones.crypt.cards = [weapon, weak, strong, tied];
    resolvePasteboardActions(kingGame, roomEntryPhase.identifier);
    assert.equal(kingGame.zones.room.cards[1], strong);
    assert.deepEqual(kingGame.zones.crypt.cards, [weapon, weak, tied]);
    assert.equal(kingGame.animationEvents[0].animation, "day0ff:animation-summon");
    kingGame.zones.room.capacity = 2;
    resolvePasteboardActions(kingGame, roomEntryPhase.identifier, [king]);
    assert.equal(kingGame.zones.room.cards.length, 3);
    assert.equal(kingGame.zones.room.cards[2], tied);
    assert.equal(kingGame.zones.room.capacity, 2);
    assert.equal(roomWithAttackFeedbackSelector.resultFunc(kingGame)!.capacity, 2);
    // Once the first animation ends, the next summon shows its extra slot.
    kingGame.animationEvents.shift();
    assert.equal(roomWithAttackFeedbackSelector.resultFunc(kingGame)!.capacity, 3);
    kingGame.animationEvents = [];
    assert.equal(roomWithAttackFeedbackSelector.resultFunc(kingGame)!.capacity, 3);
    kingGame.zones.room.cards.pop();
    assert.equal(roomWithAttackFeedbackSelector.resultFunc(kingGame)!.capacity, 2);
    kingGame.zones.dungeon.cards = [weak, strong, tied];
    dealNextRoom(kingGame, true);
    assert.equal(kingGame.zones.room.cards.length, 2);
    assert.equal(kingGame.zones.dungeon.cards.length, 1);
    kingGame.zones.room.cards = [king];
    kingGame.zones.crypt.cards = [weapon];
    resolvePasteboardActions(kingGame, roomEntryPhase.identifier);
    assert.equal(kingGame.zones.room.cards.length, 1);
    const emptySummon = kingGame.animationEvents.at(-1)!;
    assert.equal(emptySummon.animation, "day0ff:animation-summon");
    assert.ok("summonerId" in emptySummon && emptySummon.summonerId === king.id);
    assert.ok("summonedId" in emptySummon && emptySummon.summonedId === undefined);
    assert.deepEqual(kingGame.zones.crypt.cards, [weapon]);
    kingGame.zones.crypt.cards = [];
    const eventCount = kingGame.animationEvents.length;
    resolvePasteboardActions(kingGame, roomEntryPhase.identifier);
    assert.equal(kingGame.animationEvents.length, eventCount + 1);
    assert.deepEqual(kingGame.zones.room.cards, [king]);
    assert.equal(kingGame.zones.room.capacity, 2);
    const normalKing = initPasteboard("day0ff:pasteboard-skeleton.K");
    kingGame.zones.room.cards = [normalKing];
    kingGame.zones.crypt.cards = [strong];
    resolvePasteboardActions(kingGame, roomEntryPhase.identifier);
    assert.equal(kingGame.zones.room.cards.length, 1);

    // Moving the configuration onto an ordinary card must carry the behavior with it.
    const ordinary = {...initPasteboard("day0ff:pasteboard-skeleton.8"), actions: structuredClone(necromancerPasteboard.actions)};
    let game = makeGame([ordinary]);
    resolvePasteboardActions(game, roomEntryPhase.identifier);
    assert.equal(game.zones.room.cards.length, 1);
    resolvePasteboardActions(game, beforeTurnEndPhase.identifier);
    assert.deepEqual(game.zones.room.cards.slice(1).map(card => card.rank), ["2", "3", "4"]);
    assert.deepEqual(ordinary.actionProgress, {skeleton: 3});
    const disabled = {...initPasteboard(necromancerPasteboard.identifier), actions: []};
    game = makeGame([disabled]);
    resolvePasteboardActions(game, beforeTurnEndPhase.identifier);
    assert.equal(game.zones.room.cards.length, 1);

    const summoner: PlayingCardType = {...initPasteboard("day0ff:pasteboard-heal.2"), actions: [
        {id: "first", phase: beforeTurnEndPhase.identifier, type: "summon", source: "existingOrCreate", identifier: "day0ff:pasteboard-skeleton.2"},
        {id: "second", phase: beforeTurnEndPhase.identifier, type: "summon", source: "existingOrCreate", identifier: "day0ff:pasteboard-skeleton.3"},
    ]};
    game = makeGame([summoner]);
    resolvePasteboardActions(game, beforeTurnEndPhase.identifier);
    assert.deepEqual(summoner.actionProgress, {first: 1, second: 1});
    assert.equal(new Set(game.zones.room.cards.map(card => card.id)).size, 3);
    assert.equal(getEncounterStrength(summoner), summoner.strength);
    const entrySummoner = {...summoner, actions: summoner.actions!.map(action => ({...action, phase: roomEntryPhase.identifier}))};
    assert.equal(getEncounterStrength(entrySummoner), summoner.strength! + 2 + 3);

    // A before-end summon can itself have entry actions. Both summons precede consumption.
    const intermediary: PlayingCardType = {...initPasteboard("day0ff:pasteboard-skeleton.2"), actions: [{
        id: "bringThing", phase: roomEntryPhase.identifier, type: "summon", source: "existingOrCreate",
        identifier: "day0ff:pasteboard-skeleton.F.thing",
    }]};
    game = makeGame([{...summoner, actions: [summoner.actions![0]]}]);
    game.zones.dungeon.cards = [intermediary];
    resolvePasteboardActions(game, beforeTurnEndPhase.identifier);
    assert.deepEqual(game.animationEvents.map(event => event.animation), [
        "day0ff:animation-summon", "day0ff:animation-summon", "day0ff:animation-consume",
    ]);
    assert.ok(game.zones.room.cards.some(card => card.identifier === "day0ff:pasteboard-skeleton.F.thing"));
    assert.ok(game.zones.crypt.cards.some(card => card.id === intermediary.id));

    // Multiple Necromancers resolve in room order; a full room advances no other counter.
    const first = initPasteboard(necromancerPasteboard.identifier);
    const second = initPasteboard(necromancerPasteboard.identifier);
    game = makeGame([first, second]);
    resolvePasteboardActions(game, beforeTurnEndPhase.identifier);
    assert.deepEqual(first.actionProgress, {skeleton: 2});
    assert.equal(second.actionProgress, undefined);

    // End-phase effects run only after the last before-end summon finishes.
    game = createGame([], getSeededRandom("ACTION-TIMING"));
    game.zones.dungeon.cards = [initPasteboard(necromancerPasteboard.identifier)];
    game.zones.room.minimumCardsToPlay = 0;
    game.hero.health.current = 10;
    game.hero.effects = [{effect: "day0ff:effect-heal", phase: turnEndPhase.identifier, target: "hero", amount: 2}];
    game.log = createGameLog(game, "newGame");
    game = reducer(game, startGame())!;
    game = reducer(game, endTurn())!;
    assert.equal(game.hero.health.current, 10);
    for (const event of [...game.animationEvents]) game = reducer(game, completeEffectAnimation(event.id))!;
    assert.equal(game.hero.health.current, 10);
    game = reducer(game, advancePhase())!;
    assert.equal(game.hero.health.current, 12);
    assert.ok(doesReplayMatchGame(game.log!, game));

    return ["Skeleton King summons into full rooms with temporary slots that do not change future deals",
        "card actions are driven by configuration and phase, including multiple actions and empty action lists",
        "summoned arrivals resolve entry actions before consumption, and summoners keep independent progress",
        "end-phase effects wait for summons and replay remains deterministic"];
};

export const runEggHatchTests = () => {
    const egg = initPasteboard("day0ff:pasteboard-skeleton.1");
    const neighbor = initPasteboard("day0ff:pasteboard-skeleton.3");
    const game = makeGame([neighbor, egg]);
    game.currentPhase = game.phaseLifecycle.waitingPhase;
    const fist = initPasteboard("day0ff:pasteboard-fist.0");
    game.zones.weapons.cards = [fist];
    applyAttack(game, fist.id, egg.id);
    assert.equal(game.zones.room.cards.length, 2);
    assert.equal(game.zones.room.cards[0].id, neighbor.id);
    assert.equal(game.zones.room.cards[1].identifier, "day0ff:pasteboard-skeleton.A.skeletonDragon");
    assert.equal(game.zones.room.cards[1].strength, initPasteboard("day0ff:pasteboard-skeleton.A").strength);
    assert.equal(game.zones.crypt.cards[0].id, egg.id);
    assert.deepEqual(game.animationEvents.map(event => event.animation), ["day0ff:animation-attack", "day0ff:animation-hatch"]);
    assert.deepEqual(roomWithAttackFeedbackSelector.resultFunc(game)!.cards.map(card => card.id), [neighbor.id, egg.id]);
    const event = game.animationEvents[1];
    assert.ok(event.animation === "day0ff:animation-hatch");
    assert.equal(event.egg.id, egg.id);
    assert.equal(event.hatchlingId, game.zones.room.cards[1].id);
    const arriving = arrivingCardSelector.resultFunc(event, game.zones);
    assert.ok(arriving);
    const roar = getPasteboardActions(arriving).find(action => action.id === "roar");
    assert.ok(roar?.type === "playSound");
    assert.equal(roar.phase, roomEntryPhase.identifier);
    assert.equal(roar.url, `${BASE_URL}/sounds/roar-skelton-dragon.mp3`);
    assert.deepEqual(roar.animation, {borderColor: "skyblue", glowColor: "skyblue", shake: true});
    assert.equal(game.outcome, undefined);
    applyAttack(game, fist.id, game.zones.room.cards[1].id);
    assert.equal(game.zones.room.cards.length, 2);
    game.animationEvents.shift();
    assert.deepEqual(roomWithAttackFeedbackSelector.resultFunc(game)!.cards.map(card => card.id), [neighbor.id, event.hatchlingId]);
    // The King can restore the same egg while its first dragon is still in the room.
    game.animationEvents = [];
    const firstDragonId = game.zones.room.cards[1].id;
    const king = initPasteboard("day0ff:pasteboard-skeleton.K.skeletonKing");
    game.zones.room.cards.push(king);
    resolvePasteboardActions(game, roomEntryPhase.identifier, [king]);
    assert.ok(game.zones.room.cards.some(card => card.id === egg.id));
    game.animationEvents = [];
    applyAttack(game, fist.id, egg.id);
    const dragons = game.zones.room.cards.filter(card => card.identifier === "day0ff:pasteboard-skeleton.A.skeletonDragon");
    assert.equal(dragons.length, 2);
    assert.equal(dragons[0].id, firstDragonId);
    assert.notEqual(dragons[0].id, dragons[1].id);
    const secondHatch = game.animationEvents.find(event => event.animation === "day0ff:animation-hatch");
    assert.ok(secondHatch?.animation === "day0ff:animation-hatch");
    assert.equal(secondHatch.hatchlingId, dragons[1].id);
    assert.equal(new Set(game.zones.room.cards.map(card => card.id)).size, game.zones.room.cards.length);
    // Repeating the same saved action produces the same ID for game replays.
    const saved = structuredClone(game);
    saved.animationEvents = [];
    saved.zones.room.cards.push(saved.zones.crypt.cards.shift()!);
    const replay = structuredClone(saved);
    applyAttack(saved, fist.id, egg.id);
    applyAttack(replay, fist.id, egg.id);
    assert.deepEqual(saved.zones.room.cards.map(card => card.id), replay.zones.room.cards.map(card => card.id));
    // Weapon attacks use the same attack-then-hatch sequence, including breaks.
    const weaponGame = makeGame([initPasteboard("day0ff:pasteboard-skeleton.1")]);
    weaponGame.currentPhase = weaponGame.phaseLifecycle.waitingPhase;
    const weapon = {...initPasteboard("day0ff:pasteboard-weapon.2"), durability: 1};
    weaponGame.zones.weapons.cards = [weapon];
    applyAttack(weaponGame, weapon.id);
    assert.deepEqual(weaponGame.animationEvents.map(event => event.animation), ["day0ff:animation-attack", "day0ff:animation-hatch"]);
    const weaponAttack = weaponGame.animationEvents[0];
    assert.ok(weaponAttack.animation === "day0ff:animation-attack");
    assert.equal(weaponAttack.attackerId, weapon.id);
    assert.equal(weaponAttack.weaponBroken, true);
    // The action follows configuration, even when attached to another card.
    const configured = {...neighbor, actions: egg.actions};
    const other = makeGame([configured]);
    other.currentPhase = other.phaseLifecycle.waitingPhase;
    other.zones.weapons.cards = [fist];
    applyAttack(other, fist.id, configured.id);
    assert.equal(other.zones.room.cards[0].identifier, "day0ff:pasteboard-skeleton.A.skeletonDragon");
    return ["egg hatches once when attacked, preserving its room slot and preventing premature victory"];
};


export const runDarkDragonHatchTests = () => {
    const egg = initPasteboard("day0ff:pasteboard-dark.1");
    const game = makeGame([egg]);
    game.currentPhase = game.phaseLifecycle.waitingPhase;
    const fist = initPasteboard("day0ff:pasteboard-fist.0");
    game.zones.weapons.cards = [fist];
    applyAttack(game, fist.id, egg.id);
    const dragon = game.zones.room.cards[0];
    assert.equal(dragon.identifier, "day0ff:pasteboard-dark.A.darkDragon");
    assert.equal(dragon.rank, "A");
    assert.equal(dragon.suit, "dark");
    assert.equal(dragon.strength, initPasteboard("day0ff:pasteboard-dark.A").strength);
    const hatch = game.animationEvents.find(event => event.animation === "day0ff:animation-hatch");
    assert.ok(hatch);
    assert.equal(hatch.hatchlingId, dragon.id);
    const arriving = arrivingCardSelector.resultFunc(hatch, game.zones);
    assert.ok(arriving);
    const roar = getPasteboardActions(arriving).find(action => action.id === "roar");
    assert.ok(roar?.type === "playSound");
    assert.equal(roar.phase, roomEntryPhase.identifier);
    assert.equal(roar.url, `${BASE_URL}/sounds/roar-dark-dragon.mp3`);
    return ["Dark Lord egg hatches a Dark Dragon with its room-entry roar"];
};

export const runDarkLordCallTests = () => {
    for (const full of [false, true]) {
        const lord = initPasteboard("day0ff:pasteboard-dark.K.darkLord");
        const game = makeGame([lord]);
        const capacity = game.zones.room.capacity;
        if (full) {
            while (game.zones.room.cards.length < capacity) {
                game.zones.room.cards.push(initPasteboard("day0ff:pasteboard-dark.2"));
            }
        }
        const before = game.zones.room.cards.length;
        const existingDragon = initPasteboard("day0ff:pasteboard-dark.A.darkDragon");
        game.zones.crypt.cards = [existingDragon];
        resolvePasteboardActions(game, roomEntryPhase.identifier, [lord]);
        const dragon = game.zones.room.cards.at(-1)!;
        assert.equal(game.zones.room.cards.length, before + 1);
        assert.equal(game.zones.room.capacity, capacity);
        assert.equal(dragon.identifier, existingDragon.identifier);
        assert.notEqual(dragon.id, existingDragon.id);
        assert.deepEqual(game.zones.crypt.cards, [existingDragon]);
        const event = game.animationEvents[0];
        assert.ok(event.animation === "day0ff:animation-call");
        assert.equal(event.summonerId, lord.id);
        assert.equal(event.summonedId, dragon.id);
        assert.equal(event.animationCardId, lord.id);
        assert.deepEqual(event.actionAnimation, lord.actions?.[0].animation);
        const displayed = roomWithAttackFeedbackSelector.resultFunc(game)!;
        assert.equal(displayed.capacity, Math.max(capacity, before + 1));
        assert.equal(displayed.cards.at(-1)!.id, dragon.id);
        assert.equal(pendingSummonsGameSelector.resultFunc(game)[0].summonedId, dragon.id);
        assert.equal(arrivingCardSelector.resultFunc(event, game.zones)?.id, dragon.id);
        const roar = getPasteboardActions(dragon).find(action => action.type === "playSound");
        assert.ok(roar?.type === "playSound");
        assert.equal(roar.url, `${BASE_URL}/sounds/roar-dark-dragon.mp3`);
        assert.equal(roar.phase, roomEntryPhase.identifier);
        const replay = structuredClone(game);
        game.animationEvents = [];
        replay.animationEvents = [];
        resolvePasteboardActions(game, roomEntryPhase.identifier, [lord]);
        resolvePasteboardActions(replay, roomEntryPhase.identifier, [replay.zones.room.cards[0]]);
        assert.deepEqual(game.animationEvents, replay.animationEvents);
        const ids = game.zones.room.cards.map(card => card.id);
        assert.equal(new Set(ids).size, ids.length);
    }
    return ["Dark Lord calls new roaring dragons into empty or temporary overflow slots with deterministic IDs"];
};
