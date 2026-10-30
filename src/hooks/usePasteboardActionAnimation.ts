import {useLayoutEffect} from "react";
import type {PasteboardActionAnimationType} from "entities/pasteboards/actions/types.ts";
import {animatePasteboardAction} from "utils/animatePasteboardAction.ts";

export function usePasteboardActionAnimation(
    cardId: string | undefined,
    settings: PasteboardActionAnimationType | undefined,
    duration: number,
) {
    useLayoutEffect(() => {
        if (!cardId) return;
        const animations = animatePasteboardAction(cardId, settings, duration);
        return () => animations.forEach(animation => animation.cancel());
    }, [cardId, settings, duration]);
}
