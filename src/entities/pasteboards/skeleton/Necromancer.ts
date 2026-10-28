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
    strength: 1,
    roomEntryEffect: {type: "summon", identifier: "day0ff:pasteboard-skeleton.F.thing"},
    isLocked: false,
    isNotFound: false,
} as const satisfies SkeletonPasteboardDataType<"F", "necromancer">;
