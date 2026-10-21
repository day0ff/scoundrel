import {BASE_URL} from "constants.ts";
import {HealPotionCardType} from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/cards/backs/white-paper.png`;
const faceOverlayPath = `${BASE_URL}/images/cards/overlay/question-metal.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/cards/backs/white-paper.png`;
const backOverlayPath = `${BASE_URL}/images/cards/overlay/padlock-chain.png`;

type BilletHealPasteboardCardDataType = HealPotionCardType<'B'>;

export const billetPasteboardCard = {
    identifier: "day0ff:card-pasteboard.heal.B",
    type: "pasteboard",
    name: "card.pasteboard.heal.B.name",
    suit: "heal",
    rank: "B",
    color: 'red',
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
} as const satisfies BilletHealPasteboardCardDataType;