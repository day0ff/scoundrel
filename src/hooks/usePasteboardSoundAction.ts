import {animatePasteboardAction} from "utils/animatePasteboardAction.ts";
import {useCallback, useEffect, useRef} from "react";
import type {PasteboardActionType} from "entities/pasteboards/actions/types.ts";
import type {SoundPlaybackType} from "utils/AudioManager/types.ts";
import {useAudioManager} from "./useAudioManager.ts";

/** Keep a card's glow and shake aligned with its sound, including sounds that outlast a room reveal. */
export function usePasteboardSoundAction() {
    const audio = useAudioManager();
    const mounted = useRef(false);
    const active = useRef(new Map<SoundPlaybackType, Animation[]>());

    useEffect(() => {
        mounted.current = true;
        const playbacks = active.current;
        return () => {
            mounted.current = false;
            for (const [playback, animations] of playbacks) {
                playback.stop();
                animations.forEach(animation => animation.cancel());
            }
            playbacks.clear();
        };
    }, []);

    return useCallback(async (cardId: string, action: Extract<PasteboardActionType, {type: "playSound"}>) => {
        const playback = await audio.playSound({url: action.url});
        if (!playback) return;
        if (!mounted.current) {
            playback.stop();
            return;
        }
        const animations = animatePasteboardAction(cardId, action.animation, playback.durationMs);
        active.current.set(playback, animations);
        await playback.finished;
        animations.forEach(animation => animation.cancel());
        active.current.delete(playback);
    }, [audio]);
}
