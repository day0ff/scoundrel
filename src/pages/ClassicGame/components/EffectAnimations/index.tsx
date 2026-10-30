import WeaponBreakGroupFeedback from "./components/WeaponBreakGroupFeedback";
import ActionFogFeedback from "./components/ActionFogFeedback";
import ActionSoundFeedback from "./components/ActionSoundFeedback";
import WeaponBreakFeedback from "./components/WeaponBreakFeedback";
import CallFeedback from "./components/CallFeedback";
import {usePasteboardActionAnimation} from "hooks/usePasteboardActionAnimation.ts";
import {usePasteboardSoundAction} from "hooks/usePasteboardSoundAction.ts";
import {getPasteboardActions} from "entities/pasteboards/constants.ts";
import {roomEntryPhase} from "entities/phases/roomEntry.ts";
import {arrivingCardSelector} from "./selectors.ts";
import HatchFeedback from "./components/HatchFeedback";
import DrainFeedback from "./components/DrainFeedback";
import {useEffect, useRef, type FC} from "react";
import {createPortal} from "react-dom";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {clearEffectAnimations, completeEffectAnimation} from "store/features/game";
import {activeWeaponBreaksSelector, activeEffectAnimationGameSelector} from "store/features/game/selectors.ts";
import {ANIMATIONS_MAP} from "entities/animations/constants.ts";
import {thingPasteboard} from "entities/pasteboards/skeleton/Thing.ts";
import AttackFeedback from "./components/AttackFeedback";
import HealFeedback from "./components/HealFeedback";
import {useAudioManager} from "hooks/useAudioManager.ts";
import ConsumeFeedback from "./components/ConsumeFeedback";
import SummonFeedback from "./components/SummonFeedback";
import {THING_DEAL_SOUND} from "../RoomZone/constants.ts";
import type {EffectAnimationsPropsType} from "./types.ts";

const EffectAnimations: FC<EffectAnimationsPropsType> = ({roomTransition}) => {
    const dispatch = useAppDispatch();
    const audio = useAudioManager();
    const playCardSound = usePasteboardSoundAction();
    const event = useAppSelector(activeEffectAnimationGameSelector);
    const activeBreaks = useAppSelector(activeWeaponBreaksSelector);
    const arrivingCard = useAppSelector(arrivingCardSelector);
    const animation = event && ANIMATIONS_MAP[event.animation];
    const mounted = useRef(false);
    const roomEntry = (event?.animation === "day0ff:animation-attack" && !!event.instantAttack) || event?.animation === "day0ff:animation-drain" || event?.animation === "day0ff:animation-consume" || event?.animation === "day0ff:animation-summon" || event?.animation === "day0ff:animation-call" || event?.animation === "day0ff:animation-sound";
    const paused = roomEntry && roomTransition;
    usePasteboardActionAnimation(paused || event?.animation === "day0ff:animation-sound" ? undefined : event?.animationCardId, event?.actionAnimation, animation?.durationMs ?? 0);

    useEffect(() => {
        if (!event || !animation || paused || (event.animation === "day0ff:animation-weaponBreak" || event.animation === "day0ff:animation-sound")) return;
        const duration = roomEntry && event.animation !== "day0ff:animation-call" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : animation.durationMs;
        const timeout = setTimeout(() => {
            dispatch(completeEffectAnimation(event.id));
            if (arrivingCard) {
                for (const action of getPasteboardActions(arrivingCard)) {
                    if (action.type === "playSound" && action.phase === roomEntryPhase.identifier) {
                        void playCardSound(arrivingCard.id, action).catch((error: unknown) => {
                            console.warn("Unable to play card arrival sound", error);
                        });
                    }
                }
            }
            if (event.animation === "day0ff:animation-summon"
                && event.roomBefore.some(card => card.id === event.summonedId && card.identifier === thingPasteboard.identifier)) {
                void audio.playSound({url: THING_DEAL_SOUND}).catch((error: unknown) => {
                    console.warn("Unable to play Thing growl", error);
                });
            }

        }, event.animation === "day0ff:animation-attack" && event.instantAttack ? 1600 : duration);
        return () => clearTimeout(timeout);
    }, [audio, dispatch, event, animation, paused, roomEntry, arrivingCard, playCardSound]);

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

    const renderFeedback = () => {
        if (!event || !animation || paused) return null;

        if (event.animation === "day0ff:animation-sound") {
            if (activeBreaks.length) return <WeaponBreakGroupFeedback key={event.id} event={event} breaks={activeBreaks}/>;
            return <ActionSoundFeedback key={event.id} event={event}/>;
        }

        if (event.animation === "day0ff:animation-weaponBreak") {
            return createPortal(<WeaponBreakFeedback key={event.id} event={event} duration={animation.durationMs}/>, document.body);
        }

        if (event.animation === "day0ff:animation-hatch") {
            return createPortal(<HatchFeedback key={event.id} event={event} duration={animation.durationMs}/>, document.body);
        }

        if (event.animation === "day0ff:animation-drain") {
            return createPortal(<DrainFeedback key={event.id} event={event} duration={animation.durationMs}/>, document.body);
        }

        if (event.animation === "day0ff:animation-call") {
            return createPortal(<CallFeedback key={event.id} event={event} duration={animation.durationMs}/>, document.body);
        }

        if (event.animation === "day0ff:animation-summon") {
            return createPortal(<SummonFeedback key={event.id} event={event} duration={animation.durationMs}/>, document.body);
        }

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

    return <>
        <ActionFogFeedback fog={paused ? undefined : event?.fog}/>
        {renderFeedback()}
    </>;
};

export default EffectAnimations;
