import {BASE_URL} from "constants.ts";
import type {DarkLordCardType} from "./types.ts";

export const assassinPasteboardCard = {
    identifier: "day0ff:card-pasteboard.dark.F.assassin",
    type: "pasteboard",
    name: "card.pasteboard.dark.F.assassin.name",
    suit: "dark",
    variant: "assassin",
    rank: "F",
    color: "gray",
    face: {
        base: `${BASE_URL}/images/cards/base/white-paper.png`,
        image: `${BASE_URL}/images/decks/dark-lord/Assassin.png`,
        imageMode: "darken",
    },
    back: {
        base: `${BASE_URL}/images/cards/base/white-paper.png`,
        image: `${BASE_URL}/images/decks/dark-lord/back.png`,
        imageMode: "darken",
    },
} as const satisfies DarkLordCardType<"F">;
