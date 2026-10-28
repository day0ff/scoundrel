import {BASE_URL} from "constants.ts";
import type {SkeletonCardType} from "./types.ts";

export const thingPasteboardCard = {
    identifier: "day0ff:card-pasteboard.skeleton.F.thing",
    type: "pasteboard",
    name: "card.pasteboard.skeleton.F.thing.name",
    suit: "skeleton",
    variant: "thing",
    rank: "F",
    color: "gray",
    face: {
        base: `${BASE_URL}/images/cards/base/white-paper.png`,
        image: `${BASE_URL}/images/decks/skeleton/Thing.png`,
        imageMode: "darken",
    },
    back: {
        base: `${BASE_URL}/images/cards/base/white-paper.png`,
        image: `${BASE_URL}/images/decks/skeleton/back.png`,
        imageMode: "darken",
    },
} as const satisfies SkeletonCardType<"F", "thing">;
