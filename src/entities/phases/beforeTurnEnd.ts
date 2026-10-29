import type {PhaseDataType} from "./types.ts";

export const beforeTurnEndPhase = {
    identifier: "day0ff:phase-beforeTurnEnd",
    name: "phase.beforeTurnEnd.name",
    description: "phase.beforeTurnEnd.description",
    trigger: "beforeTurnEnded",
} as const satisfies PhaseDataType<"beforeTurnEnd">;
