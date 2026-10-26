import type {GameModeType} from "entities/game-modes/types.ts";
import {CollectionsStateType} from "../collections/types.ts";
import {GameStateType} from "entities/game/types.ts";


export type ProfileType = {
    profileId: string;
    name: string;
    collections: CollectionsStateType;
    games: Partial<Record<GameModeType, GameStateType | null>>;
}

export type ProfilesStateType = {
    currentProfileId: string | null | undefined;
    profiles: Array<ProfileType>;
};
