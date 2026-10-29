import assert from "node:assert/strict";
import {getSeededRandom} from "helpers/getSeededRandom.ts";
import {initPasteboard} from "entities/pasteboards/constants.ts";
import {getEncounterStrength} from "entities/pasteboards/encounters.ts";
import {necromancerPasteboard} from "entities/pasteboards/skeleton/Necromancer.ts";
import {roomEntryPhase} from "entities/phases/roomEntry.ts";
import {beforeTurnEndPhase} from "entities/phases/beforeTurnEnd.ts";
import {turnEndPhase} from "entities/phases/turnEnd.ts";
import type {PlayingCardType} from "entities/game/types.ts";
import {createGame} from "./helpers.ts";
import {resolvePasteboardActions} from "./card-actions.ts";
import reducer, {startGame, endTurn, advancePhase, completeEffectAnimation} from "./index.ts";
import {createGameLog} from "./log.ts";
import {doesReplayMatchGame} from "./replay.ts";

const makeGame = (cards: PlayingCardType[]) => {
    const game = createGame([], getSeededRandom("CARD-ACTIONS"));
    game.zones.room.cards = cards;
    return game;
};

export const runCardActionTests = () => {
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

    return ["card actions are driven by configuration and phase, including multiple actions and empty action lists",
        "summoned arrivals resolve entry actions before consumption, and summoners keep independent progress",
        "end-phase effects wait for summons and replay remains deterministic"];
};
