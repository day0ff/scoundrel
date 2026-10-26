import {createListenerMiddleware} from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
import {RootState} from "./types.ts";
import {setCollections} from "./features/collections";
import {setGame} from "./features/game";

export const rehydrateListenerMiddleware = createListenerMiddleware();

rehydrateListenerMiddleware.startListening({
    matcher: (action): action is any => action.type === REHYDRATE,
    effect: (_action, api) => {
        const {dispatch} = api;
        const state = api.getState()  as RootState;

        const profile = state.profiles.profiles?.find(({profileId}) => profileId === state.profiles.currentProfileId);

        if (!profile) {
            dispatch(setGame(state.game));
            return;
        }

        dispatch(setCollections(profile.collections));
        dispatch(setGame(profile.games[state.game?.mode ?? "classic"] ?? null));
    },
});