import type {StatType} from "entities/types.ts";
import type {PhaseDataType} from "entities/phases/types.ts";
import {PHASES_MAP} from "entities/phases/constants.ts";
import {healAnimation} from "entities/animations/heal.ts";
import type {EffectBindingType, EffectDataType} from "./types.ts";

type HealEffectDataType = EffectDataType<"heal">;

export const healEffect = {
    isLocked: false,
    isNotFound: false,
    identifier: "day0ff:effect-heal",
    name: "effect.heal.name",
    description: "effect.heal.description",
    color: "#a0d56c",
    animation: healAnimation.identifier,
    action: (health, amount) => ({
        ...health,
        current: Math.max(health.min, Math.min(health.max, health.current + amount)),
    }),
} satisfies HealEffectDataType;

export const resolveHealthEffects = (
    health: StatType,
    bindings: readonly EffectBindingType[],
    trigger: PhaseDataType<string>["trigger"],
    onResolved?: (healthBefore: StatType, healthAfter: StatType) => void,
): StatType => {
    let result = {...health};
    for (const binding of bindings) {
        const phase = PHASES_MAP[binding.phase];
        if (phase?.trigger !== trigger || binding.target !== "hero" || binding.effect !== healEffect.identifier) continue;
        if (!Number.isFinite(binding.amount) || binding.amount < 0) continue;
        const healthBefore = result;
        result = healEffect.action(result, binding.amount);
        onResolved?.(healthBefore, result);
    }
    return result;
};
