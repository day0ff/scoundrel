import {useRef, type MouseEvent, type FocusEvent, type ChangeEvent} from "react";
import {SOUND_PATHS} from "assets/sounds";
import {useAudioManager} from "./useAudioManager.ts";

export function useButtonSounds<T extends HTMLButtonElement | HTMLInputElement | HTMLSelectElement>() {
    const audio = useAudioManager();
    const hovered = useRef(false);

    const playHover = () => {
        void audio.playSound({url: SOUND_PATHS.PieceImpact1}).catch((error: unknown) => {
            console.warn("Unable to play button hover sound", error);
        });
    };

    const playActivation = (event: MouseEvent<T> | ChangeEvent<T>) => {
        if (event.currentTarget.disabled || event.defaultPrevented) return;
        void audio.unlock().then((unlocked) => {
            if (unlocked) return audio.playSound({url: SOUND_PATHS.PieceImpact2});
        }).catch((error: unknown) => {
            console.warn("Unable to play button activation sound", error);
        });
    };

    return {
        onMouseEnter: (event: MouseEvent<T>) => {
            hovered.current = true;
            if (!event.defaultPrevented && !event.currentTarget.disabled) playHover();
        },
        onMouseLeave: () => {
            hovered.current = false;
        },
        onFocus: (event: FocusEvent<T>) => {
            if (!hovered.current && !event.defaultPrevented && !event.currentTarget.disabled) playHover();
        },
        onClick: playActivation,
        onChange: playActivation,
    };
}
