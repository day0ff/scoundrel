import type {PhaseDataType, PhaseLifecycleType} from "./types.ts";

export const getNextLifecyclePhase = (
    lifecycle: PhaseLifecycleType,
    currentPhase: PhaseDataType<string>["identifier"],
) => {
    const index = lifecycle.phases.indexOf(currentPhase);
    if (index < 0 || !lifecycle.phases.length) return undefined;
    const nextIndex = (index + 1) % lifecycle.phases.length;
    return {identifier: lifecycle.phases[nextIndex], startsTurn: nextIndex === 0};
};
