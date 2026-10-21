import {BASE_URL} from "constants.ts";
import {DeckCardType} from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/cards/backs/white-paper.png`;
const faceOverlayPath = `${BASE_URL}/images/cards/overlay/question-metal.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/cards/backs/white-paper.png`;
const backOverlayPath = `${BASE_URL}/images/cards/overlay/padlock-chain.png`;

type BilletDeckCardDataType = DeckCardType<"billet">;

export const billetDeckCard = {
    identifier: "day0ff:card-deck.billet",
    type: "deck",
    name: "card.deck.billet.name",
    color: 'black',
    face: {
        base: faceBasePath,
        image: faceImagePath,
        imageMode: 'darken',
        overlay: faceOverlayPath,
        overlayMode: 'unset',
    },
    back: {
        base: backBasePath,
        image: backImagePath,
        imageMode: 'darken',
        overlay: backOverlayPath,
        overlayMode: 'unset',
    },
} satisfies BilletDeckCardDataType;