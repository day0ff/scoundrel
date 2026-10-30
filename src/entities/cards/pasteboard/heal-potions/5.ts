import { BASE_URL } from "constants.ts";
import { HealPotionCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/heal-potions/45.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/heal-potions/back.png`;

type FiveHealPasteboardCardDataType = HealPotionCardType<"5">;

export const fiveHealPasteboardCard = {
  identifier: "day0ff:card-pasteboard.heal.5",
  type: "pasteboard",
  name: "card.pasteboard.heal.5.name",
  suit: "heal",
  rank: "5",
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
} as const satisfies FiveHealPasteboardCardDataType;
