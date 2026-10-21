import { BASE_URL } from "constants.ts";
import { HealPotionCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/heal-potions/X.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/heal-potions/back.png`;

type FourHealPasteboardCardDataType = HealPotionCardType<"4">;

export const fourHealPasteboardCard = {
  identifier: "day0ff:card-pasteboard.heal.4",
  type: "pasteboard",
  name: "card.pasteboard.heal.4.name",
  suit: "heal",
  rank: "4",
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
} as const satisfies FourHealPasteboardCardDataType;
