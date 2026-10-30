import {useEffect, type FC} from "react";
import {roomEntryPhase} from "entities/phases/roomEntry.ts";
import {usePasteboardSoundAction} from "hooks/usePasteboardSoundAction.ts";
import {useAppDispatch} from "store/hooks.ts";
import {completeEffectAnimation} from "store/features/game";
import type {ActionSoundFeedbackPropsType} from "./types.ts";

const ActionSoundFeedback: FC<ActionSoundFeedbackPropsType> = ({event, onComplete}) => {
    const playSound = usePasteboardSoundAction();
    const dispatch = useAppDispatch();

    useEffect(() => {
        let cancelled = false;
        void Promise.resolve().then(async () => {
            if (cancelled) return;
            try {
                await playSound(event.cardId, {
                    id: "actionSound",
                    phase: roomEntryPhase.identifier,
                    type: "playSound",
                    url: event.url,
                    animation: event.actionAnimation,
                });
            } catch (error) {
                if (!cancelled) console.warn("Unable to play card action sound", error);
            }
            if (!cancelled) {
                if (onComplete) onComplete(event.id);
                else dispatch(completeEffectAnimation(event.id));
            }
        });
        return () => { cancelled = true; };
    }, [dispatch, playSound, event, onComplete]);

    return null;
};

export default ActionSoundFeedback;
