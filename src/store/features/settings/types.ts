export type SoundSettingsType = {
    enabled: boolean;
    /** Volume from 0 (silent) to 1 (100%). */
    volume: number;
};

export type SettingsStateType = {
    sound: SoundSettingsType;
    music: SoundSettingsType;
};
