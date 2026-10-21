import {BASE_URL} from "constants.ts";
import {DeckCardType} from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/weapon/K.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/weapon/back.png`;

type WeaponDeckCardDataType = DeckCardType<"weapon">;

export const weaponDeckCard = {
    identifier: "day0ff:card-deck.weapon",
    type: "deck",
    name: "card.deck.weapon.name",
    color: "blue",
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
} satisfies WeaponDeckCardDataType;