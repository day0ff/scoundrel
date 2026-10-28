import {getPasteboard} from "./constants.ts";
import {getCardStrength} from "./helpers.ts";
import type {PasteboardDataType} from "./types.ts";
import type {RankType} from "entities/types.ts";

// A summoner contributes its own strength and the enemy it brings into the room.
export const getEncounterStrength = (card: PasteboardDataType<string, RankType>): number => {
    const effect = card.roomEntryEffect;
    const summoned = effect?.type === "summon" ? getPasteboard(effect.identifier) : undefined;
    return (getCardStrength(card) ?? 0) + (summoned?.role === "enemy" ? getCardStrength(summoned) ?? 0 : 0);
};
