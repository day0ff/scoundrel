export type PlaySoundOptionsType = {
    url: string;
    loop?: boolean;
    volume?: number;
};

export type SoundPlaybackType = {
    stop: () => void;
};
