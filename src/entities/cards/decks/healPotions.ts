import {BASE_URL} from "constants.ts";
import {DeckCardType} from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/heal-potions/K.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/heal-potions/back.png`;

type HealPotionsDeckCardDataType = DeckCardType<"healPotions">;

export const healPotionsDeckCard = {
    identifier: "day0ff:card-deck.healPotions",
    type: "deck",
    name: "card.deck.healPotions.name",
    color: "red",
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
} satisfies HealPotionsDeckCardDataType;