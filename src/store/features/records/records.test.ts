import assert from "node:assert/strict";
import {configureStore} from "@reduxjs/toolkit";
import {initPasteboard} from "entities/pasteboards/constants.ts";
import {getSeededRandom} from "helpers/getSeededRandom.ts";
import gameReducer, {attackCard, clearEffectAnimations, moveCard, playCard, setGame, setTime, surrenderGame} from "store/features/game";
import {createGame} from "store/features/game/helpers.ts";
import {calculateGameScore} from "store/features/game/score.ts";
import profiles, {createProfile, setCurrentProfileId} from "store/features/profiles";
import records, {addWinningRecord} from "./index.ts";
import {recordsListenerMiddleware} from "./middleware.ts";
import {rankedRecordsSelector} from "./selectors.ts";

const fixture = (kind: "skeleton" | "weapon" | "heal" = "skeleton") => {
    const game = createGame([], getSeededRandom("RECORDS"));
    game.started = true;
    game.time = "00:02:15";
    game.zones.room.cards = [initPasteboard(`day0ff:pasteboard-${kind}.2`)];
    game.activeRoomCards = [...game.zones.room.cards];
    delete game.log;
    return game;
};

export const runRecordsTests = () => {
    const passed: string[] = [];
    const store = configureStore({
        reducer: {game: gameReducer, profiles, records},
        middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
            .concat(recordsListenerMiddleware.middleware),
    });
    const defaultRecord = {playerName: "Scoundrel", score: 1, time: "01:07:00"};
    assert.deepEqual(store.getState().records[0], {gameType: "classic", records: [defaultRecord]});
    passed.push("classic game starts with the default Scoundrel record");
    const profileAction = createProfile("Record Player");
    store.dispatch(profileAction);
    store.dispatch(setCurrentProfileId(profileAction.payload.profileId));
    store.dispatch(setGame(fixture()));
    const game = store.getState().game!;
    store.dispatch(attackCard({cardId: game.zones.weapons.cards[0].id, enemyId: game.zones.room.cards[0].id}));
    const winner = store.getState().game!;
    assert.equal(winner.outcome, "victory");
    assert.deepEqual(store.getState().records[0], {gameType: "classic", records: [defaultRecord, {
        playerName: "Record Player", score: calculateGameScore(winner), time: "00:02:15",
    }]});
    passed.push("winning attack automatically saves player name, final score and time");

    store.dispatch(setTime("00:03:04"));
    assert.equal(store.getState().records[0].records[1].time, "00:03:04");
    assert.deepEqual(store.getState().records[0].records[0], defaultRecord);
    store.dispatch(clearEffectAnimations());
    store.dispatch(attackCard({cardId: game.zones.weapons.cards[0].id}));
    store.dispatch(setGame(winner));
    assert.equal(store.getState().records[0].records.length, 2);
    passed.push("timer finalization updates the win without duplicates on further actions or restore");

    store.dispatch(setGame(fixture()));
    store.dispatch(surrenderGame());
    store.dispatch(setTime("00:10:00"));
    assert.equal(store.getState().records[0].records.length, 2);
    passed.push("defeat does not save or alter winning records");

    store.dispatch(setGame(fixture("weapon")));
    const weapon = store.getState().game!.zones.room.cards[0];
    store.dispatch(moveCard({cardId: weapon.id, from: "room", to: "crypt"}));
    assert.equal(store.getState().records[0].records.length, 3);
    store.dispatch(setGame(fixture("heal")));
    const potion = store.getState().game!.zones.room.cards[0];
    store.dispatch(playCard({cardId: potion.id, from: "room"}));
    assert.equal(store.getState().records[0].records.length, 4);
    passed.push("wins from removing a weapon or playing a potion also save records");

    let ranking = records(undefined, {type: "init"});
    for (const time of ["100:00:00", "02:00:00", "00:01:59", "00:01:59"]) {
        ranking = records(ranking, addWinningRecord({gameType: "classic", record: {playerName: time, score: 10, time}}));
    }
    ranking = records(ranking, addWinningRecord({gameType: "classic", record: {playerName: "Higher score", score: 20, time: "100:00:00"}}));
    ranking = records(ranking, addWinningRecord({gameType: "classic", record: {playerName: "Lower score", score: 5, time: "00:00:01"}}));
    const sorted = rankedRecordsSelector.resultFunc(ranking);
    assert.deepEqual(sorted[0].records.map(({score, time}) => ({score, time})), [
        {score: 20, time: "100:00:00"},
        {score: 10, time: "00:01:59"},
        {score: 10, time: "00:01:59"},
        {score: 10, time: "02:00:00"},
        {score: 10, time: "100:00:00"},
        {score: 5, time: "00:00:01"},
        {score: 1, time: "01:07:00"},
    ]);
    assert.deepEqual(ranking[0].records[0], defaultRecord);
    assert.equal(ranking[0].records[1].time, "100:00:00");
    assert.deepEqual(JSON.parse(JSON.stringify(ranking)), ranking);
    passed.push("rankings prioritize highest score, then fastest time, preserve stored order, and serialize");
    return passed;
};
