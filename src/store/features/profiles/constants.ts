import {NOT_PERSIST} from "constants.ts";
import {GAME_MODES} from "entities/game-modes/constants.ts";
import {initialCollectionsState} from "../collections/constants.ts";
import {ProfilesStateType} from "./types.ts";

export const initialProfilesState = NOT_PERSIST ? ({
    currentProfileId: "DEV_UUID",
    profiles: [
        {
            profileId: "DEV_UUID",
            name: "DEV",
            selectedPackIdentifier: GAME_MODES.classic.defaultPackIdentifier,
            collections: initialCollectionsState,
            games: {},
        }
    ],
}) : ({
    currentProfileId: null,
    profiles: [],
}) satisfies ProfilesStateType as ProfilesStateType;
