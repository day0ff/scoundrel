import {useLayoutEffect, useRef, type FC} from "react";
import {useSoundEffect} from "hooks/useSoundEffect.ts";
import {CALL_SOUND} from "./constants.ts";
import {getCallFlightFrames} from "./helpers.ts";
import {CallLayerStyled} from "./styles.ts";
import type {CallFeedbackPropsType} from "./types.ts";

const CallFeedback: FC<CallFeedbackPropsType> = ({event, duration}) => {
    const layer = useRef<HTMLDivElement>(null);
    useSoundEffect(CALL_SOUND, event.id);

    useLayoutEffect(() => {
        const card = document.querySelector<HTMLElement>(
            `[data-card-zone="room"] [data-card-id="${CSS.escape(event.summonedId)}"]`,
        );
        if (!card || !layer.current) return;
        const rect = card.getBoundingClientRect();
        const copy = card.cloneNode(true) as HTMLElement;
        copy.removeAttribute("data-card-id");
        copy.setAttribute("aria-hidden", "true");
        copy.inert = true;
        Object.assign(copy.style, {
            position: "fixed", left: `${rect.left}px`, top: `${rect.top}px`,
            width: `${rect.width}px`, height: `${rect.height}px`, margin: "0",
            visibility: "visible", transform: "none", transition: "none",
            transformOrigin: "center",
        });
        layer.current.append(copy);
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const flight = copy.animate(
            reduced ? [{opacity: 0}, {opacity: 1}] : getCallFlightFrames(rect, window.innerWidth),
            {duration, easing: "ease-in-out", fill: "both"},
        );
        return () => {
            flight.cancel();
            copy.remove();
        };
    }, [event.summonedId, duration]);

    return <CallLayerStyled ref={layer} aria-hidden="true"/>;
};

export default CallFeedback;
