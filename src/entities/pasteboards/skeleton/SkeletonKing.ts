import {skeletonKingPasteboardCard} from "entities/cards/pasteboard/skeleton/SkeletonKing.ts";
import {roomEntryPhase} from "entities/phases/roomEntry.ts";
import type {SkeletonPasteboardDataType} from "./types.ts";

export const skeletonKingPasteboard = {
    identifier: "day0ff:pasteboard-skeleton.K.skeletonKing",
    name: "pasteboard.skeleton.K.skeletonKing.name",
    description: "pasteboard.skeleton.K.skeletonKing.description",
    card: skeletonKingPasteboardCard,
    suit: "skeleton",
    rank: "K",
    variant: "skeletonKing",
    role: "enemy",
    actions: [{
        id: "raiseStrongest",
        phase: roomEntryPhase.identifier,
        type: "summonStrongestEnemyFromCrypt",
    }],
    isLocked: false,
    isNotFound: false,
} as const satisfies SkeletonPasteboardDataType<"K", "skeletonKing">;
