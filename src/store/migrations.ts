import type {WinningRecordType} from "./features/records/types.ts";
import type {PersistedState} from "redux-persist";
import type {ProfileType} from "./features/profiles/types.ts";
import type {GameStateType} from "entities/game/types.ts";
import {GAME_MODES} from "entities/game-modes/constants.ts";
import {getPack} from "entities/packs/constants.ts";

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
