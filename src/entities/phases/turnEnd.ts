import type {PhaseDataType} from "./types.ts";

type TurnEndPhaseDataType = PhaseDataType<"turnEnd">;

export const turnEndPhase = {
    identifier: "day0ff:phase-turnEnd",
    name: "phase.turnEnd.name",
    description: "phase.turnEnd.description",
    trigger: "turnEnded",
} as const satisfies TurnEndPhaseDataType;
