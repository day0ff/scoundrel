---
name: store-migrations
description: Create or update versioned Redux Persist migrations when persisted Redux state changes in this repository. Use for saved-state compatibility, persistence version changes, and migration tests; transient state or UI changes do not by themselves require a migration.
---

# Store migrations

## Repository integration

Before changing persisted state, inspect:

- `src/store/index.ts`: current persistence version, migration registration, whitelist, and transforms.
- `src/store/migrations.ts` and `src/store/migrations.test.ts`: existing conversions and tests.
- The affected feature's types, defaults, reducers, and listeners.
- `src/store/serializer.ts`, `src/store/features/profiles/transform.ts`, and
  `src/store/middleware.ts` when serialization or rehydration affects the change.

The root store uses Redux Persist with browser local storage. Check the current
whitelist; changing an unpersisted slice does not by itself require a migration.
Games are saved at the root and in profiles, so saved-game schema changes must
account for both locations.

## Versioning

Use explicit sequential versions in `persistConfig.version` and synchronous migration
functions registered with `createMigrate` in `src/store/index.ts`.

Version `0`, registered as `0: migrateGameState`, upgrades historical saves at version
`-1`, Redux Persist's default when no version was configured. Read the config to find
the current version rather than assuming it is still `0`.

For each new persisted schema change, add a named migration in `src/store/migrations.ts`,
append it under the next version in the manifest, and bump `persistConfig.version`
to that version. Retain earlier entries so users can skip application releases.

Example of adding a future migration after version `0`:

```ts
version: 1,
migrate: createMigrate({
    0: migrateGameState,
    1: migrateRecordsByPack,
}),
```

The example does not authorize records changes. Name each migration for its actual
transition. Do not bump persistence versions for unrelated UI work. Replay
`game.log.version` is a separate format version.

Treat released migrations as historical transitions. Add new behavior in a new
migration: saves already at an old version skip that entry. Change an old migration
only to correct its original transition, with tests for affected upgrade paths.
Do not clear user storage to make a schema change work.

## Transformation rules

- Accept and return `PersistedState` synchronously; preserve `undefined` for no save.
  `createMigrate` provides the asynchronous wrapper.
- Do not mutate input, access the live store, dispatch actions, or perform I/O.
- Preserve unrelated fields, valid values, profiles, records, and run progress.
  Keep `null` games null; adding defaults must not create a run.
- Describe historical input shapes where needed. Current TypeScript types do not
  validate or provide defaults for old saved data at runtime.
- Use stable defaults appropriate to the transition. Consider whether importing
  changing domain defaults could alter an old migration's behavior in future releases.
- Handle supported missing fields and legacy representations relevant to the task.
  Avoid speculative repairs or broad resets.
- Let Redux Persist manage `_persist.version`; do not increment it inside migrations.
  Safe repeated application is useful even with version gating.

## Loading and restoration

On startup, deserialization transforms run before migration. `createMigrate` applies
registered versions greater than the saved version and no greater than the configured
version, in ascending numeric order. Matching versions skip migration.

Redux Persist then reconciles state and dispatches `REHYDRATE`. `persistReducer`
stamps the configured version, which subsequent persistence writes save. The
rehydration listener restores the active profile's game and collections.

Keep saved-schema conversion distinct from runtime restoration. `restoreGame()`
also normalizes games supplied through `setGame()` and replay paths; inspect its
callers before moving or removing compatibility logic.

## Verification

Use historical fixtures and the actual `createMigrate` runner to test older-version
upgrades, skipping at the target version, and applying multiple migrations in order
when releases are skipped. Cover no save, null games, relevant root/profile variants,
preservation of unrelated data and valid values, and input immutability.

Do not expect `createMigrate` alone to update `_persist.version`; stamping belongs to
`persistReducer`. Test persistence and rehydration when the change depends on that
behavior or listeners.

Reuse `src/store/migrations.test.ts` and the runner in `scripts/test-game.mjs`
(`npm run test:game`), plus appropriate feature tests. Run TypeScript/build and lint
checks appropriate to changed code. Report unrelated failures separately from
migration results.
