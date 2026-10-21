import {useRef, type FocusEvent, type MouseEvent} from "react";
import {useAudioManager} from "./useAudioManager.ts";

export function useHoverSound(url: string) {
    const audio = useAudioManager();
    const hovered = useRef(false);

    const play = () => {
        void audio.playSound({url}).catch((error: unknown) => {
            console.warn("Unable to play hover sound", error);
        });
    };

    return {
        onMouseEnter: (event: MouseEvent<HTMLElement>) => {
            hovered.current = true;
            if (!event.defaultPrevented) play();
        },
        onMouseLeave: () => {
            hovered.current = false;
        },
        onFocus: (event: FocusEvent<HTMLElement>) => {
            if (!hovered.current && !event.defaultPrevented && !event.currentTarget.contains(event.relatedTarget)) play();
        },
    };
}
