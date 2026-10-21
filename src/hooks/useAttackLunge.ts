import {useLayoutEffect, type RefObject} from "react";

/** Animate a visual copy without disturbing the sortable card's transform or layout. */
export function useAttackLunge(attackerId: string, enemyId: string, duration: number, healthDamage: number, layerRef: RefObject<HTMLDivElement | null>) {
    useLayoutEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const attacker = document.querySelector<HTMLElement>(`[data-card-zone="weapons"] [data-card-id="${CSS.escape(attackerId)}"]`);
        const enemy = document.querySelector<HTMLElement>(`[data-card-zone="room"] [data-card-id="${CSS.escape(enemyId)}"]`);
        if (!attacker || !enemy || !layerRef.current) return;

        const origin = attacker.getBoundingClientRect();
        const target = enemy.getBoundingClientRect();
        const dx = target.x + target.width / 2 - origin.x - origin.width / 2;
        const dy = target.y + target.height / 2 - origin.y - origin.height / 2;
        const copy = attacker.cloneNode(true) as HTMLElement;
        copy.removeAttribute("data-card-id");
        copy.setAttribute("aria-hidden", "true");
        copy.inert = true;
        Object.assign(copy.style, {
            position: "fixed", left: `${origin.x}px`, top: `${origin.y}px`,
            width: `${origin.width}px`, height: `${origin.height}px`, margin: "0",
            transform: "none", transition: "none", zIndex: "1200", pointerEvents: "none",
        });
        layerRef.current.append(copy);
        const visibility = attacker.style.visibility;
        attacker.style.visibility = "hidden";
        const movement = copy.animate([
            {offset: 0, transform: "translate(0, 0) rotate(0deg)"},
            {offset: 0.12, transform: `translate(${-dx * 0.04}px, ${-dy * 0.04}px) rotate(-9deg)`},
            {offset: 0.32, transform: `translate(${dx}px, ${dy}px) rotate(12deg) scale(0.92)`},
            {offset: 0.42, transform: `translate(${dx * 0.88}px, ${dy * 0.88}px) rotate(-5deg)`},
            {offset: 0.78, transform: "translate(0, 0) rotate(0deg)"},
            {offset: 1, transform: "translate(0, 0) rotate(0deg)"},
        ], {duration, easing: "ease-in-out", fill: "both"});
        const impact = enemy.animate([
            {offset: 0, transform: "translateX(0)", filter: "brightness(1)"},
            {offset: 0.31, transform: "translateX(0)", filter: "brightness(1)"},
            {offset: 0.36, transform: "translateX(-7px) rotate(-3deg)", filter: "brightness(1.6)"},
            {offset: 0.43, transform: "translateX(6px) rotate(2deg)", filter: "brightness(1.15)"},
            {offset: 0.55, transform: "translateX(0)", filter: "brightness(1)"},
            {offset: 1, transform: "translateX(0)", filter: "brightness(1)"},
        ], {duration, easing: "ease-out"});
        const strength = Math.min(16, 2 + Math.max(0, healthDamage) * 1.2);
        const screenShake = enemy.closest("main")?.animate([
            {translate: "0px 0px"},
            {translate: `${-strength}px ${strength * 0.45}px`},
            {translate: `${strength * 0.85}px ${-strength * 0.4}px`},
            {translate: `${-strength * 0.65}px ${strength * 0.3}px`},
            {translate: `${strength * 0.4}px ${-strength * 0.2}px`},
            {translate: `${-strength * 0.2}px ${strength * 0.1}px`},
            {translate: "0px 0px"},
        ], {
            delay: duration * 0.32,
            duration: Math.min(400, duration * 0.45),
            easing: "ease-out",
        });

        return () => {
            movement.cancel();
            impact.cancel();
            screenShake?.cancel();
            copy.remove();
            attacker.style.visibility = visibility;
        };
    }, [attackerId, enemyId, duration, healthDamage, layerRef]);
}
