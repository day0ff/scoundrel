import {turnStartPhase} from "./turnStart.ts";
import {roomEntryPhase} from "./roomEntry.ts";
import {playerActionPhase} from "./playerAction.ts";
import {afterCardPlayedPhase} from "./afterCardPlayed.ts";
import {beforeTurnEndPhase} from "./beforeTurnEnd.ts";
import {turnEndPhase} from "./turnEnd.ts";
import type {PhaseDataType} from "./types.ts";

export const PHASES_MAP: Record<PhaseDataType<string>["identifier"], PhaseDataType<string>> = {
    [turnStartPhase.identifier]: turnStartPhase,
    [roomEntryPhase.identifier]: roomEntryPhase,
    [playerActionPhase.identifier]: playerActionPhase,
    [afterCardPlayedPhase.identifier]: afterCardPlayedPhase,
    [beforeTurnEndPhase.identifier]: beforeTurnEndPhase,
    [turnEndPhase.identifier]: turnEndPhase,
} as const;
