import {useCallback, useRef, type FC} from "react";
import {createPortal} from "react-dom";
import {weaponBreakAnimation} from "entities/animations/weaponBreak.ts";
import {useAppDispatch} from "store/hooks.ts";
import {completeEffectAnimation} from "store/features/game";
import ActionSoundFeedback from "../ActionSoundFeedback";
import WeaponBreakFeedback from "../WeaponBreakFeedback";
import {getWeaponBreakTiming} from "./helpers.ts";
import type {WeaponBreakGroupFeedbackPropsType} from "./types.ts";

const WeaponBreakGroupFeedback: FC<WeaponBreakGroupFeedbackPropsType> = ({event, breaks}) => {
    const dispatch = useAppDispatch();
    const finished = useRef(new Set<number>());
    const completed = useRef(false);
    const handleComplete = useCallback((id: number) => {
        finished.current.add(id);
        if (completed.current || finished.current.size !== breaks.length + 1) return;
        completed.current = true;
        // Keep the queue and its room snapshot intact until the whole group has finished.
        for (const id of [event.id, ...breaks.map(event => event.id)]) {
            dispatch(completeEffectAnimation(id));
        }
    }, [dispatch, event.id, breaks]);

    return <>
        <ActionSoundFeedback event={event} onComplete={handleComplete}/>
        {breaks.map((event, index) => createPortal(
            <WeaponBreakFeedback event={event} duration={weaponBreakAnimation.durationMs}
                {...getWeaponBreakTiming(index, breaks.length)} onComplete={handleComplete}/>,
            document.body,
            String(event.id),
        ))}
    </>;
};

export default WeaponBreakGroupFeedback;
