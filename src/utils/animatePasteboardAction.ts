import type {PasteboardActionAnimationType} from "entities/pasteboards/actions/types.ts";
import {animateCardBorder} from "./animateCardBorder.ts";

/** Run independently configurable effects; callers cancel them when their action finishes. */
export const animatePasteboardAction = (
    cardId: string,
    settings: PasteboardActionAnimationType | undefined,
    duration: number,
): Animation[] => {
    if (!settings || duration <= 0) return [];
    const card = document.querySelector<HTMLElement>(
        `[data-card-zone="room"] [data-card-id="${CSS.escape(cardId)}"]`,
    )?.closest<HTMLElement>("[data-card-zone]");
    if (!card) return [];
    const animations = settings.borderColor ? animateCardBorder(card, duration, settings.borderColor) : [];
    const {glowColor} = settings;
    if (glowColor) {
        const clear = "drop-shadow(0 0 0 transparent) drop-shadow(0 0 0 transparent)";
        const glow = `drop-shadow(0 0 12px ${glowColor}) drop-shadow(0 0 24px ${glowColor})`;
        animations.push(card.animate([
            {filter: clear, offset: 0},
            {filter: glow, offset: 0.2},
            {filter: glow, offset: 0.7},
            {filter: clear, offset: 1},
        ], {duration, easing: "ease-in-out"}));
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return animations;
    if (settings.shake || settings.swing) {
        const steps = Math.max(2, Math.ceil(duration / 70));
        const frames = Array.from({length: steps + 1}, (_, index) => {
            const progress = index / steps;
            const envelope = index === 0 || index === steps ? 0 : Math.sin(Math.PI * progress) ** 2;
            const shake = settings.shake ? (index % 2 ? -1 : 1) * envelope : 0;
            const swing = settings.swing ? Math.sin(progress * Math.PI * 5) * envelope : 0;
            return {
                transform: `translateX(${shake * 1.5 + swing * 3}px) rotate(${shake * 0.4 + swing * 2}deg)`,
                offset: progress,
            };
        });
        animations.push(card.animate(frames, {duration, easing: "linear"}));
    }
    return animations;
};
