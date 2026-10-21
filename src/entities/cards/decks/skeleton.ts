import {BASE_URL} from "constants.ts";
import {DeckCardType} from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/skeleton/K.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/skeleton/back.png`;

type SkeletonDeckCardDataType = DeckCardType<"skeleton">;

export const skeletonDeckCard = {
    identifier: "day0ff:card-deck.skeleton",
    type: "deck",
    name: "card.deck.skeleton.name",
    color: "gray",
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
} satisfies SkeletonDeckCardDataType;