import {NOT_PERSIST} from "constants.ts";
import {initialCollectionsState} from "../collections/constants.ts";
import {ProfilesStateType} from "./types.ts";




export const initialProfilesState = NOT_PERSIST ? ({
    currentProfileId: "DEV_UUID",
    profiles: [
        {
            profileId: "DEV_UUID",
            name: "DEV",
            collections: initialCollectionsState,
            classicGame: null,
        }
    ],
}) : ({
    currentProfileId: null,
    profiles: [],
}) satisfies ProfilesStateType as ProfilesStateType;