import type {RankType} from "entities/types.ts";

export const SUIT_ORDER: readonly string[] = ["dark", "skeleton", "weapon", "heal"];

export const RANK_ORDER = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "1", "0", "F", "E", "B"] as const satisfies readonly RankType[];
