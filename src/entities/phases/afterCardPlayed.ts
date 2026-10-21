import type {PhaseDataType} from "./types.ts";

type AfterCardPlayedPhaseDataType = PhaseDataType<"afterCardPlayed">;

export const afterCardPlayedPhase = {
    identifier: "day0ff:phase-afterCardPlayed",
    name: "phase.afterCardPlayed.name",
    description: "phase.afterCardPlayed.description",
    trigger: "cardPlayed",
} as const satisfies AfterCardPlayedPhaseDataType;
