import type {PhaseDataType} from "./types.ts";

// An arrival event, rather than a step in the turn lifecycle.
export const roomEntryPhase = {
    identifier: "day0ff:phase-roomEntry",
    name: "phase.roomEntry.name",
    description: "phase.roomEntry.description",
    trigger: "roomEntered",
} as const satisfies PhaseDataType<"roomEntry">;
