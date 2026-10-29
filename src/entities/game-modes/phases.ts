import { beforeTurnEndPhase } from "entities/phases/beforeTurnEnd.ts";
import { turnStartPhase } from "entities/phases/turnStart.ts";
import { playerActionPhase } from "entities/phases/playerAction.ts";
import { turnEndPhase } from "entities/phases/turnEnd.ts";
import type { PhaseLifecycleType } from "entities/phases/types.ts";

export const classicPhaseLifecycle = {
  identifier: "day0ff:phaseLifecycle-classicGame",
  phases: [
    turnStartPhase.identifier,
    playerActionPhase.identifier,
    beforeTurnEndPhase.identifier,
    turnEndPhase.identifier,
  ],
  waitingPhase: playerActionPhase.identifier,
} as const satisfies PhaseLifecycleType;
