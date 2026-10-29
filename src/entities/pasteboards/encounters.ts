import {roomEntryPhase} from "entities/phases/roomEntry.ts";
import {getPasteboardActions, getPasteboard} from "./constants.ts";
import {getCardStrength} from "./helpers.ts";
import type {PasteboardDataType} from "./types.ts";
import type {RankType} from "entities/types.ts";

// A summoner contributes its own strength and the enemy it brings into the room.
export const getEncounterStrength = (card: PasteboardDataType<string, RankType>): number => {
    const summonedStrength = getPasteboardActions(card).reduce((strength, action) => {
        if (action.phase !== roomEntryPhase.identifier || action.type !== "summon") return strength;
        const summoned = getPasteboard(action.identifier);
        return strength + (summoned?.role === "enemy" ? getCardStrength(summoned) ?? 0 : 0);
    }, 0);
    return (getCardStrength(card) ?? 0) + summonedStrength;
};
