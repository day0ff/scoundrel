import {useLayoutEffect, useRef} from "react";
import type {PlayingCardType} from "entities/game/types.ts";

const SLIDE_DURATION_MS = 250;

/** Keep zone artwork available after its card has left the React tree. */
export const useCardToCryptSlide = (
    zone: HTMLElement | null,
    cards: PlayingCardType[],
    cryptCards: PlayingCardType[],
) => {
    const snapshots = useRef(new Map<string, {copy: HTMLElement; rect: DOMRect}>());
    const slides = useRef(new Set<Animation>());

    useLayoutEffect(() => {
        if (!zone) return;
        const remaining = new Set(cards.map(card => card.id));
        const crypt = new Set(cryptCards.map(card => card.id));
        const target = document.querySelector<HTMLElement>('[data-zone="crypt"] [data-deck-stack]');
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        for (const [id, {copy, rect}] of snapshots.current) {
            if (remaining.has(id) || !crypt.has(id) || !target || reducedMotion) continue;
            const destination = target.getBoundingClientRect();
            if (!rect.width || !rect.height || !destination.width || !destination.height) continue;
            copy.inert = true;
            copy.setAttribute("aria-hidden", "true");
            copy.querySelectorAll<HTMLElement>("[data-card-id]").forEach(node => {
                node.removeAttribute("data-card-id");
                node.removeAttribute("data-dragging");
                Object.assign(node.style, {width: `${rect.width}px`, transform: "none", opacity: "1"});
            });
            Object.assign(copy.style, {
                position: "fixed", left: `${rect.x}px`, top: `${rect.y}px`,
                width: `${rect.width}px`, height: `${rect.height}px`, margin: "0",
                pointerEvents: "none", zIndex: "1200", transformOrigin: "top left",
            });
            document.body.append(copy);
            const slide = copy.animate([
                {transform: "translate(0, 0) scale(1, 1)", opacity: 1},
                {offset: 0.75, opacity: 1},
                {
                    transform: `translate(${destination.x - rect.x}px, ${destination.y - rect.y}px) scale(${destination.width / rect.width}, ${destination.height / rect.height})`,
                    opacity: 0,
                },
            ], {duration: SLIDE_DURATION_MS, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)", fill: "forwards"});
            slides.current.add(slide);
            const cleanup = () => {
                copy.remove();
                slides.current.delete(slide);
            };
            slide.onfinish = cleanup;
            slide.oncancel = cleanup;
        }

        snapshots.current.clear();
        for (const card of cards) {
            const node = zone.querySelector<HTMLElement>(`[data-card-id="${CSS.escape(card.id)}"]`)
                ?.closest<HTMLElement>("[data-card-zone]");
            if (node) snapshots.current.set(card.id, {
                copy: node.cloneNode(true) as HTMLElement,
                rect: node.getBoundingClientRect(),
            });
        }
    }, [cards, cryptCards, zone]);

    useLayoutEffect(() => {
        const activeSlides = slides.current;
        return () => {
            activeSlides.forEach(slide => slide.cancel());
            activeSlides.clear();
        };
    }, []);
};
