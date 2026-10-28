import assert from "node:assert/strict";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {createMigrate, persistReducer, persistStore, REHYDRATE} from "redux-persist";
import {classicPack} from "entities/packs/classic.ts";
import {necromancerPack} from "entities/packs/necromancer.ts";
import {initPasteboard} from "entities/pasteboards/constants.ts";
import gameReducer, {attackCard, moveCard, setGame, setTime, startGame, surrenderGame} from "store/features/game";
import {getInitialGame} from "store/features/game/constants.ts";
import {createGameLog} from "store/features/game/log.ts";
import {replayGameLog} from "store/features/game/replay.ts";
import {selectGamePack} from "store/features/game/actions.ts";
import {gameListenerMiddleware} from "store/features/game/middleware.ts";
import profilesReducer, {setCurrentProfileId} from "store/features/profiles";
import {profilesListenerMiddleware} from "store/features/profiles/middleware.ts";
import type {ProfilesStateType} from "store/features/profiles/types.ts";
import {rehydrateListenerMiddleware} from "store/middleware.ts";
import {serializeTransform} from "store/serializer.ts";
import {migrateCollectionsProgress, migrateGameState, migrateRecordsByPack} from "store/migrations.ts";
import type {RootState, AppDispatch} from "store/types.ts";
import collectionsReducer, {recordCollectionProgress, setCollections} from "./index.ts";
import {initialCollectionsState} from "./constants.ts";
import {collectionsListenerMiddleware} from "./middleware.ts";
import {getCompletedGamesKey, isConditionSatisfied} from "./helpers.ts";
import {packsCollectionsSelector} from "./selectors.ts";

const makeProfiles = (): ProfilesStateType => ({
    currentProfileId: "first",
    profiles: ["first", "second"].map(profileId => ({
        profileId, name: profileId, collections: structuredClone(initialCollectionsState), games: {},
    })),
});

const makeStore = (profiles = makeProfiles()) => configureStore({
    reducer: {game: gameReducer, profiles: profilesReducer, collections: collectionsReducer},
    preloadedState: {profiles},
    middleware: getDefault => getDefault({serializableCheck: false}).concat(
        collectionsListenerMiddleware.middleware, gameListenerMiddleware.middleware, profilesListenerMiddleware.middleware, rehydrateListenerMiddleware.middleware,
    ),
});

export const runCollectionTests = () => {
    const progress = {
        gamesCompleted: {[getCompletedGamesKey("classic", classicPack.identifier)]: 2, [getCompletedGamesKey("classic", necromancerPack.identifier)]: 3},
        enemiesDefeated: {}, processedEvents: {},
    };
    assert.equal(isConditionSatisfied({type: "gamesCompleted", count: 5}, progress), true);
    assert.equal(isConditionSatisfied({type: "gamesCompleted", count: 6}, progress), false);
    assert.equal(isConditionSatisfied({type: "gamesCompleted", mode: "classic", count: 5}, progress), true);
    assert.equal(isConditionSatisfied({type: "gamesCompleted", packIdentifier: classicPack.identifier, count: 3}, progress), false);
    assert.equal(isConditionSatisfied({type: "gamesCompleted", packIdentifier: necromancerPack.identifier, count: 3}, progress), true);
    assert.equal(isConditionSatisfied({type: "gamesCompleted", mode: "classic", packIdentifier: classicPack.identifier, count: 2}, progress), true);
    const store = makeStore();
    const dispatch = store.dispatch as AppDispatch;
    const pack = () => packsCollectionsSelector(store.getState() as RootState).find(item => item.identifier === necromancerPack.identifier)!;
    assert.equal(pack().isLocked, true);
    dispatch(selectGamePack(necromancerPack.identifier));
    assert.equal(store.getState().game, null);

    const run = getInitialGame();
    dispatch(setGame(run));
    dispatch(surrenderGame()); // An unstarted preview does not count.
    assert.deepEqual(store.getState().collections.progress.gamesCompleted, {});
    dispatch(startGame());
    const started = store.getState().game!;
    dispatch(surrenderGame());
    assert.equal(pack().isLocked, false);
    assert.equal(pack().isNotFound, false);
    const key = getCompletedGamesKey("classic", classicPack.identifier);
    assert.equal(store.getState().collections.progress.gamesCompleted[key], 1);
    dispatch(setTime("00:00:10"));
    dispatch(surrenderGame());
    dispatch(setGame(started));
    dispatch(surrenderGame()); // Restoring and finishing the same run cannot count twice.
    assert.equal(store.getState().collections.progress.gamesCompleted[key], 1);
    assert.deepEqual(store.getState().profiles.profiles[0].collections, store.getState().collections);
    dispatch(selectGamePack(necromancerPack.identifier));
    assert.equal(store.getState().game?.packIdentifier, necromancerPack.identifier);

    dispatch(setCurrentProfileId("second"));
    assert.equal(pack().isLocked, true);
    dispatch(setGame(getInitialGame(undefined, "classic", necromancerPack.identifier)));
    dispatch(startGame());
    dispatch(surrenderGame());
    assert.equal(pack().isLocked, false); // Any pack now satisfies Necromancer's condition.
    dispatch(setCurrentProfileId("first"));
    assert.equal(pack().isLocked, false);

    const snapshot = serializeTransform.in(store.getState().profiles, "profiles", {});
    const restoredProfiles = serializeTransform.out(JSON.parse(JSON.stringify(snapshot)), "profiles", {}) as ProfilesStateType;
    const restored = makeStore(restoredProfiles);
    restored.dispatch({type: REHYDRATE, key: "root"});
    assert.equal(restored.getState().collections.packs.find(item => item.identifier === necromancerPack.identifier)?.isLocked, false);
    assert.equal(restored.getState().collections.progress.gamesCompleted[key], 1);

    const combat = getInitialGame();
    const enemy = initPasteboard("day0ff:pasteboard-skeleton.2");
    combat.started = true;
    combat.zones.room.cards = [enemy];
    combat.log = createGameLog(combat, "newGame");
    dispatch(setGame(combat));
    dispatch(attackCard({cardId: "missing", enemyId: enemy.id}));
    assert.equal(store.getState().collections.progress.enemiesDefeated.skeleton, undefined);
    dispatch(attackCard({cardId: combat.zones.weapons.cards[0].id, enemyId: enemy.id}));
    assert.equal(store.getState().collections.progress.enemiesDefeated.skeleton, 1);
    const fought = store.getState().game!;
    replayGameLog(fought.log!); // Pure replay does not dispatch collection events.
    dispatch(setGame(combat));
    dispatch(attackCard({cardId: combat.zones.weapons.cards[0].id, enemyId: enemy.id}));
    assert.equal(store.getState().collections.progress.enemiesDefeated.skeleton, 1);
    const discarded = {...combat, zones: {...combat.zones, room: {...combat.zones.room, cards: [initPasteboard("day0ff:pasteboard-skeleton.3")]}}};
    dispatch(setGame(discarded));
    dispatch(moveCard({cardId: discarded.zones.room.cards[0].id, from: "room", to: "crypt"}));
    assert.equal(store.getState().collections.progress.enemiesDefeated.skeleton, 1);

    const victory = getInitialGame();
    victory.started = true;
    victory.zones.dungeon.cards = [];
    victory.zones.discard.cards = [];
    victory.zones.room.cards = [initPasteboard("day0ff:pasteboard-skeleton.2")];
    victory.log = createGameLog(victory, "newGame");
    dispatch(setGame(victory));
    dispatch(attackCard({cardId: victory.zones.weapons.cards[0].id, enemyId: victory.zones.room.cards[0].id}));
    assert.equal(store.getState().game?.outcome, "victory");
    assert.equal(store.getState().collections.progress.gamesCompleted[key], 2);

    const custom = structuredClone(initialCollectionsState);
    custom.decks[0].isLocked = true;
    custom.decks[0].isNotFound = true;
    custom.decks[0].condition = {
        description: "tag.collection.locked.deck.description",
        unlock: {type: "enemiesDefeated", suit: "skeleton", count: 100},
        discover: {type: "enemiesDefeated", suit: "skeleton", count: 1},
    };
    dispatch(setCollections(custom));
    dispatch(recordCollectionProgress(Array.from({length: 99}, (_, index) => ({id: `test:${index}`, type: "enemyDefeated", suit: "skeleton"}))));
    assert.equal(store.getState().collections.decks[0].isLocked, true);
    assert.equal(store.getState().collections.decks[0].isNotFound, false);
    dispatch(recordCollectionProgress([{id: "test:99", type: "enemyDefeated", suit: "skeleton"}]));
    assert.equal(store.getState().collections.decks[0].isLocked, false);
    assert.equal(isConditionSatisfied({type: "enemiesDefeated", suit: "dark", count: 1}, store.getState().collections.progress), false);
    dispatch(recordCollectionProgress([{id: "test:99", type: "enemyDefeated", suit: "skeleton"}]));
    assert.equal(store.getState().collections.progress.enemiesDefeated.skeleton, 100);

    return [
        "collection unlocks accept any completed game and count each run once",
        "unlocks and progress are isolated by profile and survive serialization and rehydration",
        "only confirmed combat defeats award enemy progress; invalid actions, discards and replay do not",
        "discovery and unlock conditions support separate enemy thresholds and deduplicate events",
    ];
};

export const runCollectionPersistenceTests = async () => {
    const saved = new Map<string, string>();
    const storage = {
        getItem: async (key: string) => saved.get(key) ?? null,
        setItem: async (key: string, value: string) => { saved.set(key, value); },
        removeItem: async (key: string) => { saved.delete(key); },
    };
    const reducer = combineReducers({
        game: gameReducer,
        collections: collectionsReducer,
        profiles: (state = makeProfiles(), action: Parameters<typeof profilesReducer>[1]) => profilesReducer(state, action),
    });
    const createStore = () => configureStore({
        reducer: persistReducer<ReturnType<typeof reducer>>({
            key: "collection-test", version: 2, storage,
            whitelist: ["profiles", "collections", "game"],
            transforms: [serializeTransform],
            migrate: createMigrate({0: migrateGameState, 1: migrateRecordsByPack, 2: migrateCollectionsProgress}),
        }, reducer),
        middleware: getDefault => getDefault({serializableCheck: false}).concat(
            collectionsListenerMiddleware.middleware, gameListenerMiddleware.middleware, rehydrateListenerMiddleware.middleware,
        ),
    });
    const first = createStore();
    let firstPersistor!: ReturnType<typeof persistStore>;
    await new Promise<void>(resolve => { firstPersistor = persistStore(first, undefined, resolve); });
    first.dispatch(setGame(getInitialGame()));
    first.dispatch(startGame());
    first.dispatch(surrenderGame());
    await firstPersistor.flush();
    firstPersistor.pause();
    const persisted = JSON.parse(saved.get("persist:collection-test")!);
    assert.equal(JSON.parse(persisted._persist).version, 2);
    assert.equal(JSON.parse(persisted.collections).packs.find((pack: {identifier: string}) => pack.identifier === necromancerPack.identifier).isLocked, false);

    const second = createStore();
    let secondPersistor!: ReturnType<typeof persistStore>;
    await new Promise<void>(resolve => { secondPersistor = persistStore(second, undefined, resolve); });
    assert.deepEqual(second.getState().collections, first.getState().collections);
    assert.deepEqual(second.getState().profiles.profiles[0].collections, first.getState().collections);
    assert.equal(second.getState()._persist.version, 2);
    assert.equal(second.getState()._persist.rehydrated, true);
    await secondPersistor.flush();
    secondPersistor.pause();
    return ["Redux Persist writes root and profile collection progress and restores unlocks at version 2"];
};
