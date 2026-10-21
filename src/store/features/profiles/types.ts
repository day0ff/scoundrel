import {CollectionsStateType} from "../collections/types.ts";
import {ClassicGameStateType} from "../classic-game/types.ts";


export type ProfileType = {
    profileId: string;
    name: string;
    collections: CollectionsStateType;
    classicGame: ClassicGameStateType | null;
}

export type ProfilesStateType = {
    currentProfileId: string | null | undefined;
    profiles: Array<ProfileType>;
};
