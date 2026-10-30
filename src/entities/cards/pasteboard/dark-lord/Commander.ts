import {BASE_URL} from "constants.ts";
import type {DarkLordCardType} from "./types.ts";

export const commanderPasteboardCard = {
    identifier: "day0ff:card-pasteboard.dark.F.commander",
    type: "pasteboard",
    name: "card.pasteboard.dark.F.commander.name",
    suit: "dark",
    variant: "commander",
    rank: "F",
    color: "gray",
    face: {
        base: `${BASE_URL}/images/cards/base/white-paper.png`,
        image: `${BASE_URL}/images/decks/dark-lord/Commander.png`,
        imageMode: "darken",
    },
    back: {
        base: `${BASE_URL}/images/cards/base/white-paper.png`,
        image: `${BASE_URL}/images/decks/dark-lord/back.png`,
        imageMode: "darken",
    },
} as const satisfies DarkLordCardType<"F">;
