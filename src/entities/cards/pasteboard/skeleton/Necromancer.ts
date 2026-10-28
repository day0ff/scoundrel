import {BASE_URL} from "constants.ts";
import type {SkeletonCardType} from "./types.ts";

export const necromancerPasteboardCard = {
    identifier: "day0ff:card-pasteboard.skeleton.F.necromancer",
    type: "pasteboard",
    name: "card.pasteboard.skeleton.F.necromancer.name",
    suit: "skeleton",
    variant: "necromancer",
    rank: "F",
    color: "gray",
    face: {
        base: `${BASE_URL}/images/cards/base/white-paper.png`,
        image: `${BASE_URL}/images/decks/skeleton/Necromancer.png`,
        imageMode: "darken",
    },
    back: {
        base: `${BASE_URL}/images/cards/base/white-paper.png`,
        image: `${BASE_URL}/images/decks/skeleton/back.png`,
        imageMode: "darken",
    },
} as const satisfies SkeletonCardType<"F", "necromancer">;
