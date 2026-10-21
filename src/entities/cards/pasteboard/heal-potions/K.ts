import { BASE_URL } from "constants.ts";
import { HealPotionCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/heal-potions/K.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/heal-potions/back.png`;

type KingHealPasteboardCardDataType = HealPotionCardType<"K">;

export const kingHealPasteboardCard = {
  identifier: "day0ff:card-pasteboard.heal.K",
  type: "pasteboard",
  name: "card.pasteboard.heal.K.name",
  suit: "heal",
  rank: "K",
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
} as const satisfies KingHealPasteboardCardDataType;
