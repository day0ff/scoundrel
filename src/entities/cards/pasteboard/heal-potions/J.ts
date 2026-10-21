import { BASE_URL } from "constants.ts";
import { HealPotionCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/heal-potions/J.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/heal-potions/back.png`;

type JackHealPasteboardCardDataType = HealPotionCardType<"J">;

export const jackHealPasteboardCard = {
  identifier: "day0ff:card-pasteboard.heal.J",
  type: "pasteboard",
  name: "card.pasteboard.heal.J.name",
  suit: "heal",
  rank: "J",
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
} as const satisfies JackHealPasteboardCardDataType;
