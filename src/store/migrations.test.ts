import assert from "node:assert/strict";
import {createMigrate} from "redux-persist";
import {migrateGameState, migrateRecordsByPack, migrateCollectionsProgress, migrateAnyGameUnlock} from "./migrations.ts";
import {getInitialGame} from "./features/game/constants.ts";
import {restoreGame} from "./features/game/helpers.ts";
import {gameSlice, startGame} from "./features/game";
import {replayGameLog} from "./features/game/replay.ts";
import {initialCollectionsState} from "./features/collections/constants.ts";

export const runGameMigrationTests = async () => {
    const initial = getInitialGame();
    const legacy = {...initial};
    Reflect.deleteProperty(legacy, "mode");
    const persisted = {
        _persist: {version: -1, rehydrated: false},
        classicGame: legacy,
        profiles: {currentProfileId: "old", profiles: [{
            profileId: "old", name: "Old", collections: initialCollectionsState, classicGame: legacy,
        }]},
    };
    let migrationCalls = 0;
    const migrate = createMigrate({0: state => {
        migrationCalls += 1;
        return migrateGameState(state);
    }});
    const migrated = await migrate(persisted, 0) as unknown as {
        game: typeof initial;
        profiles: {profiles: Array<{games: {classic: typeof initial}}>};
    };
    assert.equal("classicGame" in migrated, false);
    assert.equal(restoreGame(migrated.game).mode, "classic");
    assert.equal(restoreGame(migrated.profiles.profiles[0].games.classic).mode, "classic");
    assert.equal(migrationCalls, 1);
    // persistReducer writes the configured version after rehydration.
    const versionZero = {...migrated, _persist: {version: 0, rehydrated: true}};
    assert.equal(await migrate(versionZero, 0), versionZero);
    assert.equal(migrationCalls, 1);
    assert.deepEqual(await migrateGameState(migrated as unknown as typeof persisted), migrated);
    assert.equal(await migrateGameState(undefined), undefined);

    const historical = {
        ...persisted,
        settings: {sound: {enabled: true, volume: 0.5}},
        records: [{gameType: "classic-game", records: [{playerName: "Old", score: 10, time: "00:01:00"}]}],
    };
    const before = structuredClone(historical);
    const migrateToOne = createMigrate({0: migrateGameState, 1: migrateRecordsByPack});
    const upgraded = await migrateToOne(historical, 1) as unknown as typeof historical & {
        records: Array<{packIdentifier: string}>;
    };
    assert.equal(upgraded.records[0].gameType, "classic");
    assert.equal(upgraded.records[0].packIdentifier, "day0ff:pack-classic");
    assert.deepEqual(upgraded.records[0].records, historical.records[0].records);
    assert.deepEqual(upgraded.settings, historical.settings);
    assert.deepEqual(historical, before);
    const fromZero = {...historical, _persist: {version: 0, rehydrated: true}};
    assert.deepEqual(await migrateToOne(fromZero, 1), migrateRecordsByPack(fromZero));
    const fromOne = {...upgraded, _persist: {version: 1, rehydrated: true}};
    assert.equal(await migrateToOne(fromOne, 1), fromOne);
    assert.equal(await migrateToOne(undefined, 1), undefined);
    assert.equal(migrateRecordsByPack(undefined), undefined);
    const known = {...fromOne, records: [{...fromOne.records[0], packIdentifier: "day0ff:pack-other"}]};
    assert.deepEqual(migrateRecordsByPack(known), known);

    const historicalCollections = {
        heroes: initialCollectionsState.heroes,
        decks: initialCollectionsState.decks.map(deck => ({...deck, isLocked: true})),
    };
    const collectionSave = {
        _persist: {version: 1, rehydrated: false},
        game: null,
        settings: historical.settings,
        profiles: {currentProfileId: "first", profiles: [
            {profileId: "first", name: "First", collections: historicalCollections, games: {classic: null}},
            {profileId: "second", name: "Second", collections: historicalCollections, games: {}},
        ]},
    };
    const collectionBefore = structuredClone(collectionSave);
    const migrateToTwo = createMigrate({0: migrateGameState, 1: migrateRecordsByPack, 2: migrateCollectionsProgress});
    const collectionUpgrade = await migrateToTwo(collectionSave, 2) as unknown as typeof collectionSave & {
        collections: typeof initialCollectionsState;
        profiles: {profiles: Array<{collections: typeof initialCollectionsState}>};
    };
    assert.deepEqual(collectionSave, collectionBefore);
    assert.equal(collectionUpgrade.game, null);
    assert.equal(collectionUpgrade.profiles.profiles[0].games.classic, null);
    assert.deepEqual(collectionUpgrade.settings, collectionSave.settings);
    assert.deepEqual(collectionUpgrade.collections, collectionUpgrade.profiles.profiles[0].collections);
    for (const profile of collectionUpgrade.profiles.profiles) {
        assert.deepEqual(profile.collections.heroes, historicalCollections.heroes);
        assert.deepEqual(profile.collections.decks, historicalCollections.decks);
        assert.equal(profile.collections.packs.find(pack => pack.identifier === "day0ff:pack-necromancer")?.isLocked, true);
        assert.deepEqual(profile.collections.progress, {gamesCompleted: {}, enemiesDefeated: {}, processedEvents: {}});
    }
    assert.deepEqual(migrateCollectionsProgress(collectionUpgrade), collectionUpgrade);
    const targetVersion = {...collectionUpgrade, _persist: {version: 2, rehydrated: true}};
    assert.equal(await migrateToTwo(targetVersion, 2), targetVersion);
    assert.equal(await migrateToTwo(undefined, 2), undefined);
    assert.equal(migrateCollectionsProgress(undefined), undefined);
    const skipped = await migrateToTwo(historical, 2) as unknown as {collections: typeof initialCollectionsState; records: Array<{packIdentifier: string}>};
    assert.equal(skipped.records[0].packIdentifier, "day0ff:pack-classic");
    assert.equal(skipped.collections.packs.length, initialCollectionsState.packs.length);
    const guestSave = {_persist: {version: 1, rehydrated: false}, collections: initialCollectionsState};
    assert.deepEqual(migrateCollectionsProgress(guestSave), guestSave);

    const savedCollections = structuredClone(initialCollectionsState);
    savedCollections.progress.gamesCompleted["classic:day0ff:pack-other"] = 1;
    const oldNecromancer = savedCollections.packs.find(pack => pack.identifier === "day0ff:pack-necromancer")!;
    oldNecromancer.condition = {
        description: "pack.necromancer.unlock.description",
        unlock: {type: "gamesCompleted", mode: "classic", packIdentifier: "day0ff:pack-classic", count: 1},
    };
    const versionTwo = {...collectionUpgrade, _persist: {version: 2, rehydrated: true}, collections: savedCollections,
        profiles: {...collectionUpgrade.profiles, profiles: collectionUpgrade.profiles.profiles.map(profile => ({...profile, collections: savedCollections}))}};
    const beforeThree = structuredClone(versionTwo);
    const migrateToThree = createMigrate({0: migrateGameState, 1: migrateRecordsByPack, 2: migrateCollectionsProgress, 3: migrateAnyGameUnlock});
    const versionThree = await migrateToThree(versionTwo, 3) as unknown as typeof versionTwo;
    for (const collections of [versionThree.collections, ...versionThree.profiles.profiles.map(profile => profile.collections)]) {
        const pack = collections.packs.find(pack => pack.identifier === "day0ff:pack-necromancer")!;
        assert.equal(pack.isLocked, false);
        assert.equal(pack.isNotFound, false);
        assert.deepEqual(pack.condition?.unlock, {type: "gamesCompleted", count: 1});
        assert.deepEqual(collections.progress, savedCollections.progress);
    }
    assert.deepEqual(versionTwo, beforeThree);
    assert.deepEqual(migrateAnyGameUnlock(versionThree), versionThree);
    assert.equal(migrateAnyGameUnlock(undefined), undefined);
    const currentThree = {...versionThree, _persist: {version: 3, rehydrated: true}};
    assert.equal(await migrateToThree(currentThree, 3), currentThree);
    const skipToThree = await migrateToThree(historical, 3) as unknown as typeof versionThree;
    assert.deepEqual(skipToThree.collections.packs.find(pack => pack.identifier === "day0ff:pack-necromancer")?.condition?.unlock, {type: "gamesCompleted", count: 1});

    const started = gameSlice.reducer(initial, startGame());
    assert.ok(started);
    const replayed = replayGameLog({
        version: 1, origin: "newGame", initialState: legacy as typeof initial,
        entries: [{number: 1, turnNumber: initial.turnNumber,
            action: {type: "classicGame/startGame", payload: undefined},
            healthAfter: started.hero.health.current, seedAfter: started.seed}],
    });
    assert.deepEqual(replayed, started);
    return ["migration 2 initializes root and profile collections without changing heroes, decks or runs; skipped releases and repeated migration are supported", "migration 1 assigns legacy records to Classic, preserves data, and supports skipped releases", "version -1 saves run migration 0; version 0 saves skip it", "legacy root and profile saves migrate, restore and remain stable", "legacy replay actions run through the shared game slice"];
};
