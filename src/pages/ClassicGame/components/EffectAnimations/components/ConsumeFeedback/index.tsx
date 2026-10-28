import {useLayoutEffect, useRef, useState, type FC} from "react";
import {useSoundEffect} from "hooks/useSoundEffect.ts";
import {CONSUME_SOUNDS} from "./constants.ts";
import {ConsumeLayerStyled} from "./styles.ts";
import type {ConsumeFeedbackPropsType} from "./types.ts";

const ConsumeFeedback: FC<ConsumeFeedbackPropsType> = ({event, duration}) => {
    const layer = useRef<HTMLDivElement>(null);
    const [sound] = useState(() => CONSUME_SOUNDS[Math.floor(Math.random() * CONSUME_SOUNDS.length)]);
    useSoundEffect(sound, event.id);
    useLayoutEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const enemy = document.querySelector<HTMLElement>(`[data-card-zone="room"] [data-card-id="${CSS.escape(event.enemyId)}"]`);
        const thing = document.querySelector<HTMLElement>(`[data-card-zone="room"] [data-card-id="${CSS.escape(event.consumerId)}"]`);
        const crypt = document.querySelector<HTMLElement>('[data-zone="crypt"] [data-deck-stack]');
        if (!enemy || !thing || !crypt || !layer.current) return;
        const origin = enemy.getBoundingClientRect();
        const target = thing.getBoundingClientRect();
        const destination = crypt.getBoundingClientRect();
        const dx = target.x + target.width / 2 - origin.x - origin.width / 2;
        const dy = target.y + target.height / 2 - origin.y - origin.height / 2;
        const cryptX = destination.x + destination.width / 2 - origin.x - origin.width / 2;
        const cryptY = destination.y + destination.height / 2 - origin.y - origin.height / 2;
        const copy = enemy.cloneNode(true) as HTMLElement;
        copy.removeAttribute("data-card-id");
        copy.setAttribute("aria-hidden", "true");
        copy.inert = true;
        Object.assign(copy.style, {
            position: "fixed", left: `${origin.x}px`, top: `${origin.y}px`,
            width: `${origin.width}px`, height: `${origin.height}px`, margin: "0",
            transform: "none", transition: "none", pointerEvents: "none", transformOrigin: "center",
        });
        const creases = document.createElement("div");
        Object.assign(creases.style, {
            position: "absolute", inset: "0", pointerEvents: "none", zIndex: "20",
            background: "repeating-linear-gradient(35deg, #0008 0 2px, #fff5 3px 5px, transparent 6px 19px)",
            mixBlendMode: "multiply", opacity: "0",
        });
        copy.append(creases);
        layer.current.append(copy);
        const visibility = enemy.style.visibility;
        enemy.style.visibility = "hidden";
        const crumpled = "polygon(16% 8%, 39% 0, 62% 14%, 87% 5%, 100% 34%, 83% 59%, 94% 86%, 60% 100%, 38% 83%, 11% 94%, 0 61%, 14% 37%)";
        const movement = copy.animate([
            {offset: 0, transform: "translate(0, 0) scale(1) rotate(0deg)", clipPath: "inset(0)", opacity: 1},
            {offset: 0.16, transform: "translate(0, 0) scale(0.82, 0.94) skew(8deg, -4deg) rotate(-9deg)", opacity: 1},
            {offset: 0.36, transform: "translate(0, 0) scale(0.36, 0.44) skew(-12deg, 9deg) rotate(18deg)", clipPath: crumpled, opacity: 1},
            {offset: 0.7, transform: `translate(${dx}px, ${dy}px) scale(0.12, 0.16) rotate(140deg)`, clipPath: crumpled, opacity: 1},
            {offset: 0.78, transform: `translate(${dx}px, ${dy}px) scale(0.12, 0.16) rotate(160deg)`, clipPath: crumpled, opacity: 1},
            {offset: 1, transform: `translate(${cryptX}px, ${cryptY}px) scale(0.06) rotate(260deg)`, clipPath: crumpled, opacity: 0},
        ], {duration, easing: "ease-in-out", fill: "both"});
        const folds = creases.animate([{opacity: 0}, {opacity: 0.85}], {duration: duration * 0.36, fill: "both"});
        const pulse = thing.animate([
            {transform: "scale(1)", filter: "brightness(1)"},
            {transform: "scale(1.08)", filter: "brightness(1.35)"},
            {transform: "scale(1)", filter: "brightness(1)"},
        ], {delay: duration * 0.64, duration: duration * 0.22, easing: "ease-out"});
        return () => {
            movement.cancel();
            folds.cancel();
            pulse.cancel();
            copy.remove();
            enemy.style.visibility = visibility;
        };
    }, [event.consumerId, event.enemyId, duration]);

    return <ConsumeLayerStyled ref={layer} aria-hidden="true"/>;
};

export default ConsumeFeedback;
