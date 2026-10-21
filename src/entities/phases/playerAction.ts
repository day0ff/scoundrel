import type {PhaseDataType} from "./types.ts";

type PlayerActionPhaseDataType = PhaseDataType<"playerAction">;

export const playerActionPhase = {
    identifier: "day0ff:phase-playerAction",
    name: "phase.playerAction.name",
    description: "phase.playerAction.description",
    trigger: "playerActionStarted",
} as const satisfies PlayerActionPhaseDataType;
