import {beforeTurnEndPhase} from "entities/phases/beforeTurnEnd.ts";
import {afterCardPlayedPhase} from "./afterCardPlayed.ts";
import {turnStartPhase} from "./turnStart.ts";
import {turnEndPhase} from "./turnEnd.ts";
import {playerActionPhase} from "./playerAction.ts";
import type {PhaseDataType} from "./types.ts";

export const PHASES_MAP: Record<PhaseDataType<string>["identifier"], PhaseDataType<string>> = {
    [beforeTurnEndPhase.identifier]: beforeTurnEndPhase,
    [afterCardPlayedPhase.identifier]: afterCardPlayedPhase,
    [turnStartPhase.identifier]: turnStartPhase,
    [turnEndPhase.identifier]: turnEndPhase,
    [playerActionPhase.identifier]: playerActionPhase,
} as const;
