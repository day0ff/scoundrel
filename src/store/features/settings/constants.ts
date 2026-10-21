import type {SettingsStateType} from "./types.ts";

export const initialSettingsState: SettingsStateType = {
    music: {
        enabled: false,
        volume: 0.5,
    },
    sound: {
        enabled: true,
        volume: 1,
    },
};
