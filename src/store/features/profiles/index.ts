import type {GameModeType} from "entities/game-modes/types.ts";
import {GAME_MODES} from "entities/game-modes/constants.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4 as getUuid} from "uuid";
import {initialCollectionsState} from "../collections/constants.ts";
import {setCurrentProfileIdAction} from "./actions.ts";
import {initialProfilesState} from "./constants.ts";
import {GameStateType} from "entities/game/types.ts";
import {ProfileType} from "./types.ts";
import {CollectionsStateType} from "../collections/types.ts";

export const profilesSlice = createSlice({
    name: "profiles",
    initialState: initialProfilesState,
    reducers: {
        setCurrentProfileId: setCurrentProfileIdAction,
        setCurrentProfile: (state, action: PayloadAction<ProfileType>) => {
            const index = state.profiles.findIndex(({profileId}: ProfileType) => profileId === action.payload.profileId);

            if (index !== -1) return;

            state.profiles[index] = action.payload;

            setCurrentProfileIdAction(state, {payload: action.payload.profileId, type: 'profiles/setCurrentProfileId'});
        },
        createProfile: {
            reducer: (state, action: PayloadAction<ProfileType>) => {
                state.profiles.push(action.payload);
            },
            prepare: (name: string) => {
                const profileId = getUuid();

                return {
                    payload: {
                        profileId,
                        name,
                        selectedPackIdentifier: GAME_MODES.classic.defaultPackIdentifier,
                        collections: initialCollectionsState,
                        games: {},
                    },
                };
            },
        },
        updateProfile: (state, action: PayloadAction<ProfileType>) => {
            const index = state.profiles.findIndex(({profileId}: ProfileType) => profileId === action.payload.profileId);

            setCurrentProfileIdAction(state, {payload: action.payload.profileId, type: 'profiles/setCurrentProfileId'});

            if (index === -1) {
                state.profiles.push(action.payload);

                return;
            }

            state.profiles[index] = action.payload;
        },
        updateProfileGame: (state, action: PayloadAction<{mode: GameModeType; game: GameStateType | null}>) => {
            const profile = state.profiles.find(item => item.profileId === state.currentProfileId);
            if (profile) {
                profile.games[action.payload.mode] = action.payload.game;
                if (action.payload.game) profile.selectedPackIdentifier = action.payload.game.packIdentifier;
            }
        },
        updateProfileCollectionsData: (state, action: PayloadAction<CollectionsStateType>) => {
            if (state === null) return;

            const index = state.profiles.findIndex(({profileId}: ProfileType) => profileId === state.currentProfileId);

            if (index === -1) {

                return;
            }

            state.profiles[index].collections = action.payload;
        },
    },
});

export const {
    setCurrentProfileId,
    setCurrentProfile,
    createProfile,
    updateProfile,
    updateProfileCollectionsData,
    updateProfileGame,
} = profilesSlice.actions;

export default profilesSlice.reducer;
