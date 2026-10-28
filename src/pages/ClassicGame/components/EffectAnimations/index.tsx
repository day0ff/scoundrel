import {useEffect, useRef, type FC} from "react";
import {createPortal} from "react-dom";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {clearEffectAnimations, completeEffectAnimation} from "store/features/game";
import {activeEffectAnimationGameSelector} from "store/features/game/selectors.ts";
import {ANIMATIONS_MAP} from "entities/animations/constants.ts";
import AttackFeedback from "./components/AttackFeedback";
import HealFeedback from "./components/HealFeedback";
import {useAudioManager} from "hooks/useAudioManager.ts";
import {ATTACK_SOUNDS} from "./components/AttackFeedback/constants.ts";
import ConsumeFeedback from "./components/ConsumeFeedback";
import type {EffectAnimationsPropsType} from "./types.ts";

const EffectAnimations: FC<EffectAnimationsPropsType> = ({roomTransition}) => {
    const dispatch = useAppDispatch();
    const audio = useAudioManager();
    const event = useAppSelector(activeEffectAnimationGameSelector);
    const animation = event && ANIMATIONS_MAP[event.animation];
    const mounted = useRef(false);
    const paused = event?.animation === "day0ff:animation-consume" && roomTransition;

    useEffect(() => {
        if (!event || !animation || paused) return;
        const duration = event.animation === "day0ff:animation-consume" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : animation.durationMs;
        const timeout = setTimeout(() => {
            dispatch(completeEffectAnimation(event.id));
            if (event.animation === "day0ff:animation-attack" && event.weaponBroken) {
                const url = ATTACK_SOUNDS.broken[Math.floor(Math.random() * ATTACK_SOUNDS.broken.length)];
                void audio.playSound({url}).catch((error: unknown) => {
                    console.warn("Unable to play weapon break sound", error);
                });
            }
        }, duration);
        return () => clearTimeout(timeout);
    }, [audio, dispatch, event, animation, paused]);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
            // Strict Mode's effect replay must not discard entry animations already queued before mount.
            queueMicrotask(() => {
                if (!mounted.current) dispatch(clearEffectAnimations());
            });
        };
    }, [dispatch]);

    if (!event || !animation || paused) return null;

    if (event.animation === "day0ff:animation-consume") {
        return createPortal(<ConsumeFeedback key={event.id} event={event} duration={animation.durationMs}/>, document.body);
    }

    if (event.animation === "day0ff:animation-attack") {
        return createPortal(<AttackFeedback key={event.id} event={event} duration={animation.durationMs} />, document.body);
    }

    const healingLayer = document.getElementById("healing-effects");
    return healingLayer ? createPortal(
        <HealFeedback key={event.id} duration={animation.durationMs} potion={event.potion} />,
        healingLayer,
    ) : null;
};

export default EffectAnimations;
