import type {WinningRecordType} from "./features/records/types.ts";
import type {PersistedState} from "redux-persist";
import type {ProfileType} from "./features/profiles/types.ts";
import type {GameStateType} from "entities/game/types.ts";
import {GAME_MODES} from "entities/game-modes/constants.ts";
import {getPack} from "entities/packs/constants.ts";
import {initialCollectionsState} from "./features/collections/constants.ts";
import type {CollectionsStateType} from "./features/collections/types.ts";
import {classicPack} from "entities/packs/classic.ts";
import {necromancerPack} from "entities/packs/necromancer.ts";
import {evaluateCollection} from "./features/collections/helpers.ts";

const migrateSavedGame = (game: GameStateType | null): GameStateType | null => game ? {
    ...game,
    packIdentifier: game.packIdentifier && getPack(game.packIdentifier)
        ? game.packIdentifier : GAME_MODES[game.mode ?? "classic"].defaultPackIdentifier,
} : null;

// Version 0: upgrade unversioned saves before redux-persist reconciles the root state.
export const migrateGameState = (persisted: PersistedState): PersistedState => {
    if (!persisted) return persisted;
    const state = persisted as PersistedState & {
        classicGame?: GameStateType | null;
        game?: GameStateType | null;
        records?: Array<{gameType: string; records: WinningRecordType[]}>;
        profiles?: {profiles: Array<ProfileType & {classicGame?: GameStateType | null}>};
    };
    const {classicGame, ...rest} = state;
    const migrated = {
        ...rest,
        ...(state.records ? {records: state.records.map(group => ({
            ...group, gameType: group.gameType === "classic-game" ? "classic" : group.gameType,
        }))} : {}),
        game: migrateSavedGame(state.game === undefined ? classicGame ?? null : state.game),
        ...(state.profiles ? {profiles: {
            ...state.profiles,
            profiles: state.profiles.profiles.map(({classicGame: saved, ...profile}) => {
                const games = Object.fromEntries(Object.entries(profile.games ?? {classic: saved ?? null})
                    .map(([mode, game]) => [mode, migrateSavedGame(game)]));
                const selected = profile.selectedPackIdentifier ?? games.classic?.packIdentifier;
                return {
                    ...profile,
                    games,
                    selectedPackIdentifier: selected && getPack(selected)
                        ? selected : GAME_MODES.classic.defaultPackIdentifier,
                };
            }),
        }} : {}),
    };
    return migrated;
};

// Version 1: historical records all belonged to the Classic pack.
export const migrateRecordsByPack = (persisted: PersistedState): PersistedState => {
    if (!persisted) return persisted;
    const state = persisted as PersistedState & {
        records?: Array<{gameType: string; packIdentifier?: string; records: WinningRecordType[]}>;
    };
    if (!state.records) return persisted;
    const migrated = {
        ...state,
        records: state.records.map(group => ({
            ...group,
            packIdentifier: group.packIdentifier ?? "day0ff:pack-classic",
        })),
    };
    return migrated;
};

// Version 2: introduce per-profile packs, counters and duplicate-event protection.
// Historical game totals cannot be recovered from the winning leaderboard.
export const migrateCollectionsProgress = (persisted: PersistedState): PersistedState => {
    if (!persisted) return persisted;
    type HistoricalCollections = Partial<CollectionsStateType>;
    const state = persisted as PersistedState & {
        collections?: HistoricalCollections;
        profiles?: {currentProfileId?: string | null; profiles: Array<Omit<ProfileType, "collections"> & {collections?: HistoricalCollections}>};
    };
    // Keep the version-2 roster and availability defaults explicit for skipped releases.
    const packs = [
        {...classicPack, isLocked: false, isNotFound: false},
        {...necromancerPack, isLocked: true, isNotFound: true},
    ];
    const upgrade = (collections?: HistoricalCollections): CollectionsStateType => ({
        ...initialCollectionsState,
        ...collections,
        packs: [...packs.map(pack => {
            const saved = collections?.packs?.find(item => item.identifier === pack.identifier);
            return {...pack, ...saved};
        }), ...(collections?.packs?.filter(saved => !packs.some(pack => pack.identifier === saved.identifier)) ?? [])],
        progress: {
            gamesCompleted: {}, enemiesDefeated: {}, processedEvents: {},
            ...collections?.progress,
        },
    });
    const profiles = state.profiles && {
        ...state.profiles,
        profiles: state.profiles.profiles.map(profile => ({...profile, collections: upgrade(profile.collections)})),
    };
    const current = profiles?.profiles.find(profile => profile.profileId === profiles.currentProfileId);
    const migrated = {
        ...state,
        collections: current?.collections ?? upgrade(state.collections),
        ...(profiles ? {profiles} : {}),
    };
    return migrated;
};

// Version 3: Necromancer requires one completed game, regardless of mode or pack.
export const migrateAnyGameUnlock = (persisted: PersistedState): PersistedState => {
    if (!persisted) return persisted;
    const state = persisted as PersistedState & {
        collections?: CollectionsStateType;
        profiles?: {profiles: ProfileType[]};
    };
    const upgrade = (collections: CollectionsStateType): CollectionsStateType => ({
        ...collections,
        packs: collections.packs.map(pack => {
            if (pack.identifier !== "day0ff:pack-necromancer") return pack;
            const updated = {...pack, condition: {
                description: "pack.necromancer.unlock.description",
                unlock: {type: "gamesCompleted", count: 1},
                discover: {type: "gamesCompleted", count: 1},
            } satisfies NonNullable<typeof pack.condition>};
            evaluateCollection(updated, collections.progress);
            return updated;
        }),
    });
    const migrated = {
        ...state,
        ...(state.collections ? {collections: upgrade(state.collections)} : {}),
        ...(state.profiles ? {profiles: {...state.profiles, profiles: state.profiles.profiles.map(profile => ({
            ...profile, collections: upgrade(profile.collections),
        }))}} : {}),
    };
    return migrated;
};

// Version 4: track victories separately and require one win for Necromancer.
export const migrateVictoryUnlock = (persisted: PersistedState): PersistedState => {
    if (!persisted) return persisted;
    const state = persisted as PersistedState & {
        collections?: CollectionsStateType;
        profiles?: {profiles: ProfileType[]};
    };
    const upgrade = (collections: CollectionsStateType): CollectionsStateType => {
        const progress = {...collections.progress, gamesWon: collections.progress.gamesWon ?? {}};
        return {
            ...collections,
            progress,
            packs: collections.packs.map(pack => {
                if (pack.identifier !== "day0ff:pack-necromancer") return pack;
                const updated = {...pack, condition: {
                    description: "pack.necromancer.unlock.description",
                    unlock: {type: "gamesWon", count: 1},
                    discover: {type: "gamesWon", count: 1},
                } satisfies NonNullable<typeof pack.condition>};
                evaluateCollection(updated, progress);
                return updated;
            }),
        };
    };
    const migrated = {
        ...state,
        ...(state.collections ? {collections: upgrade(state.collections)} : {}),
        ...(state.profiles ? {profiles: {...state.profiles, profiles: state.profiles.profiles.map(profile => ({
            ...profile, collections: upgrade(profile.collections),
        }))}} : {}),
    };
    return migrated;
};
