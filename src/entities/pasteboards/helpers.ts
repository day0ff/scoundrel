import {RANK_STRENGTH_MAP} from "entities/constants.ts";
import type {RankType} from "entities/types.ts";

// Rank describes the printed card; strength can change independently during play.
export const getCardStrength = (card: {rank: RankType; strength?: number}): number | undefined => {
    const strength = card.strength ?? RANK_STRENGTH_MAP[card.rank];
    return strength !== undefined && Number.isSafeInteger(strength) && strength >= 0 ? strength : undefined;
};
