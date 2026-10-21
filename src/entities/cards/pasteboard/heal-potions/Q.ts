import { BASE_URL } from "constants.ts";
import { HealPotionCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/heal-potions/Q.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/heal-potions/back.png`;

type QueenHealPasteboardCardDataType = HealPotionCardType<"Q">;

export const queenHealPasteboardCard = {
  identifier: "day0ff:card-pasteboard.heal.Q",
  type: "pasteboard",
  name: "card.pasteboard.heal.Q.name",
  suit: "heal",
  rank: "Q",
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
} as const satisfies QueenHealPasteboardCardDataType;
