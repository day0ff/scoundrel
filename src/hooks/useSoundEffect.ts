import {useEffect} from "react";
import {useAudioManager} from "./useAudioManager.ts";
import type {SoundPlaybackType} from "utils/AudioManager/types.ts";

/** Play on mount or a new defined animation value, and stop on cleanup. */
export function useSoundEffect(url: string, value: number | undefined, loop = false) {
    const audio = useAudioManager();

    useEffect(() => {
        if (value === undefined) return;

        let cancelled = false;
        let playback: SoundPlaybackType | null = null;

        // Skip the first setup discarded by React Strict Mode.
        void Promise.resolve().then(async () => {
            if (cancelled) return;
            playback = await audio.playSound({url, loop});
            if (cancelled) playback?.stop();
        }).catch((error: unknown) => {
            if (!cancelled) console.warn(`Unable to play sound ${url}`, error);
        });

        return () => {
            cancelled = true;
            playback?.stop();
        };
    }, [audio, url, value, loop]);
}
