import type {WinningRecordType} from "./features/records/types.ts";
import type {PersistedState} from "redux-persist";
import type {ProfileType} from "./features/profiles/types.ts";
import type {GameStateType} from "entities/game/types.ts";

// Runs after deserialization, before redux-persist reconciles the root state.
export const migrateGameState = async (persisted: PersistedState): Promise<PersistedState> => {
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
        game: state.game === undefined ? classicGame ?? null : state.game,
        ...(state.profiles ? {profiles: {
            ...state.profiles,
            profiles: state.profiles.profiles.map(({classicGame: saved, ...profile}) => ({
                ...profile,
                games: profile.games ?? {classic: saved ?? null},
            })),
        }} : {}),
    };
    return migrated;
};
