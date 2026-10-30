import {aceSkeletonPasteboardCard} from "./A.ts";
import type {SkeletonCardType} from "./types.ts";

export const skeletonDragonPasteboardCard = {
    ...aceSkeletonPasteboardCard,
    identifier: "day0ff:card-pasteboard.skeleton.A.skeletonDragon",
    name: "card.pasteboard.skeleton.A.skeletonDragon.name",
    variant: "skeletonDragon",
} as const satisfies SkeletonCardType<"A", "skeletonDragon">;
