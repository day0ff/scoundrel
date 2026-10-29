import {configureStore} from "@reduxjs/toolkit";
import {gameListenerMiddleware} from "./middleware.ts";
import assert from "node:assert/strict";
import {initPasteboard} from "entities/pasteboards/constants.ts";
import {getSeededRandom} from "helpers/getSeededRandom.ts";
import {createGame, restoreGame} from "./helpers.ts";
import reducer, {endTurn, startGame, clearEffectAnimations, completeEffectAnimation, advancePhase, setGame} from "./index.ts";
import {createGameLog} from "./log.ts";
import {doesReplayMatchGame} from "./replay.ts";
import {summonOsteomancerSkeletons} from "./osteomancer.ts";

export const runOsteomancerTests = () => {
    const card = initPasteboard("day0ff:pasteboard-skeleton.F.osteomancer");
    assert.equal(card.strength, 14);
    assert.equal(card.rank, "F");
    const initial = createGame([], getSeededRandom("OSTEOMANCER"));
    initial.zones.dungeon.cards = [card];
    initial.zones.room.minimumCardsToPlay = 0;
    initial.log = createGameLog(initial, "newGame");
    let game = reducer(initial, startGame())!;
    assert.equal(game.animationEvents.length, 0);
    const store = configureStore({
        reducer: {game: reducer},
        preloadedState: {game},
        middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
            .prepend(gameListenerMiddleware.middleware),
    });
    store.dispatch(endTurn());
    const pending = store.getState().game!;
    const pendingEvents = [...pending.animationEvents];
    for (const event of pendingEvents.slice(0, -1)) {
        store.dispatch(completeEffectAnimation(event.id));
        assert.equal(store.getState().game!.currentPhase, "day0ff:phase-beforeTurnEnd");
        assert.equal(store.getState().game!.turnNumber, game.turnNumber);
    }
    store.dispatch(completeEffectAnimation(pendingEvents.at(-1)!.id));
    const finished = store.getState().game!;
    assert.equal(finished.currentPhase, finished.phaseLifecycle.waitingPhase);
    assert.equal(finished.turnNumber, game.turnNumber + 1);
    assert.ok(doesReplayMatchGame(finished.log!, finished));
    store.dispatch(setGame(structuredClone(pending)));
    assert.equal(store.getState().game!.currentPhase, finished.phaseLifecycle.waitingPhase);
    assert.equal(store.getState().game!.turnNumber, finished.turnNumber);
    assert.equal(store.getState().game!.zones.room.cards.find(item => item.id === card.id)!.skeletonsSummoned, 3);

    const turnBefore = game.turnNumber;
    const roomsBefore = game.completedRooms?.length ?? 0;
    game = reducer(game, endTurn())!;
    assert.equal(game.currentPhase, "day0ff:phase-beforeTurnEnd");
    assert.equal(game.turnNumber, turnBefore);
    assert.equal(game.completedRooms?.length ?? 0, roomsBefore);
    assert.equal(game.zones.room.cards[0].id, card.id);
    const events = game.animationEvents.filter(event => event.animation === "day0ff:animation-summon");
    assert.equal(events.length, game.zones.room.capacity - 1);
    assert.deepEqual(events.map(event => event.roomBefore.at(-1)!.rank), ["2", "3", "4"]);
    assert.ok(events.every(event => event.roomBefore.some(item => item.id === card.id)));
    assert.equal(new Set(events.map(event => event.summonedId)).size, 3);
    assert.ok(doesReplayMatchGame(game.log!, game));
    for (const event of events) {
        game = reducer(game, completeEffectAnimation(event.id))!;
        assert.equal(game.turnNumber, turnBefore);
        assert.equal(game.completedRooms?.length ?? 0, roomsBefore);
    }
    game = reducer(game, advancePhase())!;
    assert.equal(game.currentPhase, game.phaseLifecycle.waitingPhase);
    assert.equal(game.turnNumber, turnBefore + 1);
    assert.equal(game.completedRooms!.length, roomsBefore + 1);
    assert.ok(doesReplayMatchGame(game.log!, game));
    game = restoreGame(JSON.parse(JSON.stringify(game)));
    game = structuredClone(reducer(game, clearEffectAnimations())!);
    // Keep just the returning Osteomancer so the next End has three empty slots.
    game.zones.room.cards = game.zones.room.cards.filter(item => item.id === card.id);
    game = reducer(game, endTurn())!;
    assert.deepEqual(game.animationEvents.filter(event => event.animation === "day0ff:animation-summon")
        .map(event => event.roomBefore.at(-1)!.rank), ["5", "6", "7"]);

    game = structuredClone(game);
    const other = initPasteboard(card.identifier);
    game.zones.room.cards = [{...card, skeletonsSummoned: 6}];
    game.animationEvents = [];
    summonOsteomancerSkeletons(game);
    assert.deepEqual(game.zones.room.cards.slice(1).map(item => item.rank), ["8", "9", "9"]);
    game.zones.room.cards = [other];
    summonOsteomancerSkeletons(game);
    assert.equal(game.zones.room.cards[1].rank, "2");
    const count = other.skeletonsSummoned;
    summonOsteomancerSkeletons(game);
    assert.equal(other.skeletonsSummoned, count);
    return ["Osteomancer summons on End with individual animations and deterministic replay", "Osteomancer remembers independent progress across restoration and caps summons at rank 9", "before-end phase keeps the room and turn active until summon animations finish"];
};
