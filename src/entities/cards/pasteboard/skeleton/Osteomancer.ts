import {BASE_URL} from "constants.ts";
import type {SkeletonCardType} from "./types.ts";

export const osteomancerPasteboardCard = {
    identifier: "day0ff:card-pasteboard.skeleton.F.osteomancer",
    type: "pasteboard",
    name: "card.pasteboard.skeleton.F.osteomancer.name",
    suit: "skeleton",
    variant: "osteomancer",
    rank: "F",
    color: "gray",
    face: {
        base: `${BASE_URL}/images/cards/base/white-paper.png`,
        image: `${BASE_URL}/images/decks/skeleton/Osteomancer.png`,
        imageMode: "darken",
    },
    back: {
        base: `${BASE_URL}/images/cards/base/white-paper.png`,
        image: `${BASE_URL}/images/decks/skeleton/back.png`,
        imageMode: "darken",
    },
} as const satisfies SkeletonCardType<"F", "osteomancer">;
