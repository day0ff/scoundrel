import {useLayoutEffect, useRef, useState, type FC} from "react";
import Card from "components/Card";
import PasteboardCardMark from "components/PasteboardCard/components/PasteboardCardMark";
import {useSoundEffect} from "hooks/useSoundEffect.ts";
import {EGG_CRACK_SOUNDS, EGG_HOLD_MS} from "./constants.ts";
import {EggTemplateStyled, HatchLayerStyled} from "./styles.ts";
import type {HatchFeedbackPropsType} from "./types.ts";

const HatchFeedback: FC<HatchFeedbackPropsType> = ({event, duration}) => {
    const layer = useRef<HTMLDivElement>(null);
    const template = useRef<HTMLDivElement>(null);
    const [sound] = useState(() => EGG_CRACK_SOUNDS[Math.floor(Math.random() * EGG_CRACK_SOUNDS.length)]);
    useSoundEffect(sound, event.id);

    useLayoutEffect(() => {
        const dragon = document.querySelector<HTMLElement>(`[data-card-zone="room"] [data-card-id="${CSS.escape(event.hatchlingId)}"]`);
        if (!dragon || !template.current || !layer.current) return;
        const rect = dragon.getBoundingClientRect();
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const animations: Animation[] = [];
        const halves = [-1, 1].map(side => {
            const half = template.current!.cloneNode(true) as HTMLElement;
            Object.assign(half.style, {
                visibility: "visible", position: "fixed", left: `${rect.left}px`, top: `${rect.top}px`,
                width: `${rect.width}px`, height: `${rect.height}px`, transformOrigin: "center",
                clipPath: side < 0
                    ? "polygon(0 0, 52% 0, 46% 18%, 55% 34%, 44% 51%, 54% 68%, 47% 84%, 52% 100%, 0 100%)"
                    : "polygon(52% 0, 100% 0, 100% 100%, 52% 100%, 47% 84%, 54% 68%, 44% 51%, 55% 34%, 46% 18%)",
            });
            layer.current!.append(half);
            animations.push(half.animate([
                {offset: 0, transform: "translate(0, 0) rotate(0deg)", opacity: 1},
                {offset: EGG_HOLD_MS / duration, transform: "translate(0, 0) rotate(0deg)", opacity: 1},
                {offset: 0.55, transform: reduced ? "none" : `translate(${side * rect.width * 0.4}px, 8px) rotate(${side * 18}deg)`, opacity: 1},
                {transform: reduced ? "none" : `translate(${side * rect.width * 0.8}px, ${rect.height * 0.5}px) rotate(${side * 35}deg)`, opacity: 0},
            ], {duration, fill: "both", easing: "linear"}));
            return half;
        });
        return () => { animations.forEach(animation => animation.cancel()); halves.forEach(half => half.remove()); };
    }, [event, duration]);

    return (
        <HatchLayerStyled ref={layer} aria-hidden="true">
            <EggTemplateStyled ref={template}>
                <Card {...event.egg.card} $size={6}
                    mark={<PasteboardCardMark suit={event.egg.suit} rank={event.egg.rank} color={event.egg.card.color}/>}/>
            </EggTemplateStyled>
        </HatchLayerStyled>
    );
};

export default HatchFeedback;
