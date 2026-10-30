export type PlaySoundOptionsType = {
    url: string;
    loop?: boolean;
    volume?: number;
};

export type SoundPlaybackType = {
    durationMs: number;
    finished: Promise<void>;
    stop: () => void;
};
