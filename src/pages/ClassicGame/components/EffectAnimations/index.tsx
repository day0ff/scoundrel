import {useEffect, type FC} from "react";
import {createPortal} from "react-dom";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {clearEffectAnimations, completeEffectAnimation} from "store/features/game";
import {activeEffectAnimationGameSelector} from "store/features/game/selectors.ts";
import {ANIMATIONS_MAP} from "entities/animations/constants.ts";
import AttackFeedback from "./components/AttackFeedback";
import HealFeedback from "./components/HealFeedback";
import {useAudioManager} from "hooks/useAudioManager.ts";
import {ATTACK_SOUNDS} from "./components/AttackFeedback/constants.ts";

const EffectAnimations: FC = () => {
    const dispatch = useAppDispatch();
    const audio = useAudioManager();
    const event = useAppSelector(activeEffectAnimationGameSelector);
    const animation = event && ANIMATIONS_MAP[event.animation];

    useEffect(() => {
        if (!event || !animation) return;
        const timeout = setTimeout(() => {
            dispatch(completeEffectAnimation(event.id));
            if (event.animation === "day0ff:animation-attack" && event.weaponBroken) {
                const url = ATTACK_SOUNDS.broken[Math.floor(Math.random() * ATTACK_SOUNDS.broken.length)];
                void audio.playSound({url}).catch((error: unknown) => {
                    console.warn("Unable to play weapon break sound", error);
                });
            }
        }, animation.durationMs);
        return () => clearTimeout(timeout);
    }, [audio, dispatch, event, animation]);

    useEffect(() => () => { dispatch(clearEffectAnimations()); }, [dispatch]);

    if (!event || !animation) return null;

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
