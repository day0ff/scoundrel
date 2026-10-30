import {useLayoutEffect, useRef, type FC} from "react";
import {useSoundEffect} from "hooks/useSoundEffect.ts";
import {SUMMON_SOUND} from "./constants.ts";
import {SummonLayerStyled} from "./styles.ts";
import type {SummonFeedbackPropsType} from "./types.ts";

const SummonFeedback: FC<SummonFeedbackPropsType> = ({event, duration}) => {
    const layer = useRef<HTMLDivElement>(null);
    useSoundEffect(SUMMON_SOUND, event.id);

    useLayoutEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const card = event.summonedId
            ? document.querySelector<HTMLElement>(`[data-card-zone="room"] [data-card-id="${CSS.escape(event.summonedId)}"]`)
            : null;
        const summoner = document.querySelector<HTMLElement>(`[data-card-zone="room"] [data-card-id="${CSS.escape(event.summonerId)}"]`);
        const pulse = summoner?.animate([
            {offset: 0, transform: "translateX(0) rotate(0deg)", filter: "brightness(1)"},
            {offset: 0.2, transform: "translateX(-3px) rotate(-2deg)", filter: "brightness(1.5) drop-shadow(0 0 18px #87ceeb)"},
            {offset: 0.4, transform: "translateX(3px) rotate(2deg)", filter: "brightness(1.8) drop-shadow(0 0 24px #87ceeb)"},
            {offset: 0.6, transform: "translateX(-3px) rotate(-2deg)", filter: "brightness(1.8) drop-shadow(0 0 24px #87ceeb)"},
            {offset: 0.8, transform: "translateX(2px) rotate(1deg)", filter: "brightness(1.5) drop-shadow(0 0 18px #87ceeb)"},
            {offset: 1, transform: "translateX(0) rotate(0deg)", filter: "brightness(1)"},
        ], {duration, easing: "ease-in-out"});
        if (!card || !layer.current) return () => pulse?.cancel();
        const rect = card.getBoundingClientRect();
        const ground = document.createElement("div");
        Object.assign(ground.style, {
            position: "fixed", left: `${rect.x}px`, top: `${rect.y}px`,
            width: `${rect.width}px`, height: `${rect.height}px`, overflow: "hidden",
            borderBottom: "3px solid transparent",
        });
        const aura = document.createElement("div");
        Object.assign(aura.style, {
            position: "fixed", left: `${rect.x - rect.width * 0.6}px`,
            top: `${rect.y + rect.height * 0.35}px`, width: `${rect.width * 2.2}px`,
            height: `${rect.height * 1.1}px`, opacity: "0",
            background: "radial-gradient(ellipse, #e0f6ffff 0%, #87ceebdd 20%, #4cb5e5aa 42%, transparent 72%)",
            filter: "blur(8px)", transformOrigin: "center",
        });
        const copy = card.cloneNode(true) as HTMLElement;
        copy.removeAttribute("data-card-id");
        copy.setAttribute("aria-hidden", "true");
        copy.inert = true;
        Object.assign(copy.style, {
            visibility: "visible", width: "100%", height: "100%", margin: "0",
            transform: "none", transition: "none", transformOrigin: "bottom center",
        });
        ground.append(copy);
        layer.current.append(aura, ground);
        const rise = copy.animate([
            {offset: 0, transform: "translateY(105%)", filter: "brightness(0.25)"},
            {offset: 0.18, transform: "translateY(105%)", filter: "brightness(0.25)"},
            {offset: 0.85, transform: "translateY(0)", filter: "brightness(1.3)"},
            {offset: 1, transform: "translateY(0)", filter: "brightness(1)"},
        ], {duration, easing: "ease-out", fill: "both"});
        const glow = aura.animate([
            {offset: 0, opacity: 0, transform: "scale(0.6)"},
            {offset: 0.3, opacity: 1, transform: "scale(1)"},
            {offset: 0.65, opacity: 1, transform: "scale(1.1)"},
            {offset: 1, opacity: 0, transform: "scale(1.2)"},
        ], {duration, easing: "ease-in-out", fill: "both"});
        const groundGlow = ground.animate([
            {offset: 0, borderColor: "transparent", filter: "drop-shadow(0 0 0 transparent)"},
            {offset: 0.3, borderColor: "#e0f6ff", filter: "drop-shadow(0 0 12px #87ceeb) drop-shadow(0 5px 26px #4cb5e5)"},
            {offset: 0.65, borderColor: "#87ceeb", filter: "drop-shadow(0 0 10px #87ceeb) drop-shadow(0 5px 22px #4cb5e5)"},
            {offset: 1, borderColor: "transparent", filter: "drop-shadow(0 0 0 transparent)"},
        ], {duration, easing: "ease-in-out", fill: "both"});
        return () => {
            rise.cancel();
            glow.cancel();
            groundGlow.cancel();
            pulse?.cancel();
            aura.remove();
            ground.remove();
        };
    }, [event.summonedId, event.summonerId, duration]);

    return <SummonLayerStyled ref={layer} aria-hidden="true"/>;
};

export default SummonFeedback;
