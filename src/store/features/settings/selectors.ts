import {createSelector} from "@reduxjs/toolkit";
import type {RootState} from "store/types.ts";
import {initialSettingsState} from "./constants.ts";

export const settingsSelector = (state: RootState) => state.settings;

export const musicSettingsSelector = createSelector(
    settingsSelector,
    (settings) => settings.music ?? initialSettingsState.music,
);

export const soundSettingsSelector = createSelector(
    settingsSelector,
    (settings) => settings.sound,
);

export const soundEnabledSelector = createSelector(
    soundSettingsSelector,
    (sound) => sound.enabled,
);

export const soundVolumeSelector = createSelector(
    soundSettingsSelector,
    (sound) => sound.volume,
);

export const effectiveSoundVolumeSelector = createSelector(
    soundEnabledSelector,
    soundVolumeSelector,
    (enabled, volume) => enabled ? volume : 0,
);
