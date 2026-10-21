import {isAnyOf, createListenerMiddleware} from "@reduxjs/toolkit";
import {RootState} from "../../types.ts";
import {setCollections} from "../collections";
import {clearClassicGame, setClassicGame} from "../classic-game";
import {setCurrentProfileId} from "./index.ts";

export const profilesListenerMiddleware = createListenerMiddleware();

profilesListenerMiddleware.startListening({
    matcher: isAnyOf(
        setCurrentProfileId
    ),
    effect: (action, api) => {
        const {dispatch} = api;

        // Perform side effects here (e.g., API calls, logging, etc.)
        const state = api.getState() as RootState;

        switch (action.type){
            case "profiles/setCurrentProfileId": {
                const profile = state.profiles.profiles?.find(({profileId}: {profileId: string}) => profileId === state.profiles.currentProfileId);

                if (!profile) {
                    dispatch(clearClassicGame());
                    return;
                }

                dispatch(setCollections(profile.collections))
                dispatch(setClassicGame(profile.classicGame));

                break;
            }
            default:
        }

    },
});