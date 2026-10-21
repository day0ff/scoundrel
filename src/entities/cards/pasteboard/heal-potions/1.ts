import { BASE_URL } from "constants.ts";
import { HealPotionCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/heal-potions/X.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/heal-potions/back.png`;

type OneHealPasteboardCardDataType = HealPotionCardType<"1">;

export const oneHealPasteboardCard = {
  identifier: "day0ff:card-pasteboard.heal.1",
  type: "pasteboard",
  name: "card.pasteboard.heal.1.name",
  suit: "heal",
  rank: "1",
  color: "red",
  face: {
    base: faceBasePath,
    image: faceImagePath,
    imageMode: "darken",
  },
  back: {
    base: backBasePath,
    image: backImagePath,
    imageMode: "darken",
  },
} as const satisfies OneHealPasteboardCardDataType;
