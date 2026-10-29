import {beforeTurnEndPhase} from "entities/phases/beforeTurnEnd.ts";
import {necromancerPasteboardCard} from "entities/cards/pasteboard/skeleton/Necromancer.ts";
import type {SkeletonPasteboardDataType} from "./types.ts";

export const necromancerPasteboard = {
    identifier: "day0ff:pasteboard-skeleton.F.necromancer",
    name: "pasteboard.skeleton.F.necromancer.name",
    description: "pasteboard.skeleton.F.necromancer.description",
    card: necromancerPasteboardCard,
    suit: "skeleton",
    variant: "necromancer",
    rank: "F",
    role: "enemy",
    strength: 14,
    actions: [{
        id: "skeleton",
        phase: beforeTurnEndPhase.identifier,
        type: "summonSequence",
        suit: "skeleton",
        ranks: ["2", "3", "4", "5", "6", "7", "8", "9", "T"],
        count: "emptyRoomSlots",
        progression: "perCard",
    }],
    isLocked: false,
    isNotFound: false,
} as const satisfies SkeletonPasteboardDataType<"F", "necromancer">;
