import { BASE_URL } from "constants.ts";
import type {FistCardType} from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/fist/X.png`;
const faceOverlayPath = `${BASE_URL}/images/cards/overlay/question-metal.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/fist/back.png`;
const backOverlayPath = `${BASE_URL}/images/cards/overlay/padlock-chain.png`;

type BilletFistPasteboardCardDataType = FistCardType<'B'>;

export const billetFistPasteboardCard = {
    identifier: "day0ff:card-pasteboard.fist.B",
    type: "pasteboard",
    name: "card.pasteboard.fist.B.name",
    suit: "fist",
    rank: "B",
    color: "sienna",
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
} as const satisfies BilletFistPasteboardCardDataType;
