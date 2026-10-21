import {BASE_URL} from "constants.ts";
import {HealPotionCardType} from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/heal-potions/A.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/heal-potions/back.png`;

type AceHealPasteboardCardDataType = HealPotionCardType<"A">;

export const aceHealPasteboardCard = {
    identifier: "day0ff:card-pasteboard.heal.A",
    type: "pasteboard",
    name: "card.pasteboard.heal.A.name",
    suit: "heal",
    rank: "A",
    color: 'red',
    face: {
        base: faceBasePath,
        image: faceImagePath,
        imageMode: 'darken'
    },
    back: {
        base: backBasePath,
        image: backImagePath,
        imageMode: 'darken'
    },
} as const satisfies AceHealPasteboardCardDataType;