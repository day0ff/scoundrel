import { BASE_URL } from "constants.ts";
import { HealPotionCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/heal-potions/X.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/heal-potions/back.png`;

type EightHealPasteboardCardDataType = HealPotionCardType<"8">;

export const eightHealPasteboardCard = {
  identifier: "day0ff:card-pasteboard.heal.8",
  type: "pasteboard",
  name: "card.pasteboard.heal.8.name",
  suit: "heal",
  rank: "8",
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
} as const satisfies EightHealPasteboardCardDataType;
