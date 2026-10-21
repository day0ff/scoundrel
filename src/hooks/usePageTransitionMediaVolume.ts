import {useContext, useLayoutEffect, useRef, type RefObject} from "react";
import {PageTransitionAudioContext} from "context/PageTransitionAudio/context.ts";
import {fadeMediaVolume} from "utils/fadeMediaVolume.ts";

export const usePageTransitionMediaVolume = (
    ref: RefObject<HTMLMediaElement | null>,
    volume: number,
) => {
    const {gain, durationMs} = useContext(PageTransitionAudioContext);
    const mediaRef = useRef<HTMLMediaElement | null>(null);

    useLayoutEffect(() => {
        const media = ref.current;
        if (!media) return;
        const target = volume * gain;

        // Incoming media must start muted while its page renders behind the curtains.
        if (mediaRef.current !== media) {
            mediaRef.current = media;
            media.volume = target;
            return;
        }

        return fadeMediaVolume(media, target, durationMs);
    }, [ref, volume, gain, durationMs]);
};
