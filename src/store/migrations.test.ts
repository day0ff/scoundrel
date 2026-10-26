import assert from "node:assert/strict";
import {migrateGameState} from "./migrations.ts";
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
    const migrated = await migrateGameState(persisted) as unknown as {
        game: typeof initial;
        profiles: {profiles: Array<{games: {classic: typeof initial}}>};
    };
    assert.equal("classicGame" in migrated, false);
    assert.equal(restoreGame(migrated.game).mode, "classic");
    assert.equal(restoreGame(migrated.profiles.profiles[0].games.classic).mode, "classic");
    assert.deepEqual(await migrateGameState(migrated as unknown as typeof persisted), migrated);
    assert.equal(await migrateGameState(undefined), undefined);

    const started = gameSlice.reducer(initial, startGame());
    assert.ok(started);
    const replayed = replayGameLog({
        version: 1, origin: "newGame", initialState: legacy as typeof initial,
        entries: [{number: 1, turnNumber: initial.turnNumber,
            action: {type: "classicGame/startGame", payload: undefined},
            healthAfter: started.hero.health.current, seedAfter: started.seed}],
    });
    assert.deepEqual(replayed, started);
    return ["legacy root and profile saves migrate, restore and remain stable", "legacy replay actions run through the shared game slice"];
};
