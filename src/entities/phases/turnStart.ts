import type {PhaseDataType} from "./types.ts";

type TurnStartPhaseDataType = PhaseDataType<"turnStart">;

export const turnStartPhase = {
    identifier: "day0ff:phase-turnStart",
    name: "phase.turnStart.name",
    description: "phase.turnStart.description",
    trigger: "turnStarted",
} as const satisfies TurnStartPhaseDataType;
