import {useLayoutEffect, useRef, useState, type FC} from "react";
import {useSoundEffect} from "hooks/useSoundEffect.ts";
import {CALL_SOUND} from "./constants.ts";
import {getCallFlightFrames} from "./helpers.ts";
import {CallLayerStyled, SoundWaveStyled} from "./styles.ts";
import type {CallFeedbackPropsType} from "./types.ts";

const CallFeedback: FC<CallFeedbackPropsType> = ({event, duration}) => {
    const layer = useRef<HTMLDivElement>(null);
    useSoundEffect(event.soundUrl ?? CALL_SOUND, event.id);
    const [waveOrigin, setWaveOrigin] = useState<{x: number; y: number} | null>(null);

    useLayoutEffect(() => {
        if (!event.soundWaves) return;
        const commander = document.querySelector<HTMLElement>(`[data-card-zone="room"] [data-card-id="${CSS.escape(event.summonerId)}"]`);
        if (!commander) return;
        const rect = commander.getBoundingClientRect();
        setWaveOrigin({x: rect.left + rect.width / 2, y: rect.top + rect.height / 2});
    }, [event.soundWaves, event.summonerId]);

    useLayoutEffect(() => {
        if (!event.summonedId) return;
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
        const source = event.sourceZone
            ? document.querySelector<HTMLElement>(`[data-zone="${event.sourceZone}"]`)?.getBoundingClientRect()
            : undefined;
        const flight = copy.animate(
            reduced ? [{opacity: 0}, {opacity: 1}] : getCallFlightFrames(rect, window.innerWidth, source),
            {duration, easing: "ease-in-out", fill: "both"},
        );
        return () => {
            flight.cancel();
            copy.remove();
        };
    }, [event.summonedId, event.sourceZone, duration]);

    return <CallLayerStyled ref={layer} aria-hidden="true">
        {waveOrigin && [0, 1, 2, 3].map(index => <SoundWaveStyled
            key={index}
            $duration={duration}
            $delay={index * duration * 0.12}
            style={{left: waveOrigin.x, top: waveOrigin.y}}
        />)}
    </CallLayerStyled>;
};

export default CallFeedback;
