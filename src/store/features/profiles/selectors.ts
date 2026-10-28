import {createSelector} from "@reduxjs/toolkit";
import type {RootState} from "store/types.ts";
import {packsCollectionsSelector} from "store/features/collections/selectors.ts";
import {GAME_MODES} from "entities/game-modes/constants.ts";
import {
    ProfilesStateType, ProfileType,
} from "./types.ts";

export const profilesSelector = createSelector((state: RootState) => state, (state: RootState): ProfilesStateType => state.profiles);

export const profilesCurrentProfileIdSelector = createSelector(profilesSelector, (profiles:ProfilesStateType): string | null | undefined => profiles.currentProfileId);

export const profilesProfilesSelector = createSelector(profilesSelector, (profiles:ProfilesStateType): Array<ProfileType> => profiles.profiles);

export const profilesProfilesLengthSelector = createSelector(profilesProfilesSelector, (profiles:Array<ProfileType>): number  => profiles.length);

export const currentProfileIndexSelector = createSelector([profilesCurrentProfileIdSelector, profilesProfilesSelector], (currentProfileId: string | null | undefined, profiles:Array<ProfileType> ): number => {
    return profiles?.findIndex(({profileId}) => profileId === currentProfileId);
});

export const currentProfileSelector = createSelector([profilesCurrentProfileIdSelector, profilesProfilesSelector], (currentProfileId: string | null | undefined, profiles:Array<ProfileType> ): ProfileType | undefined => {
    return profiles?.find(({profileId}) => profileId === currentProfileId);
});

export const currentProfileNameSelector = createSelector(currentProfileSelector, (profile: ProfileType | undefined ): string | undefined => {
    return profile?.name;
});

export const selectedPackIdentifierSelector = createSelector(currentProfileSelector, packsCollectionsSelector, (profile, packs) => {
    const identifier = profile?.selectedPackIdentifier ?? profile?.games.classic?.packIdentifier;
    const pack = packs.find(pack => pack.identifier === identifier && !pack.isLocked && !pack.isNotFound);
    return pack?.identifier ?? GAME_MODES.classic.defaultPackIdentifier;
});

export const getProfileByIndexSelector = (index: number) => createSelector(profilesProfilesSelector, (profiles:Array<ProfileType> ): ProfileType | undefined => {
    return profiles[index - 1];
});
