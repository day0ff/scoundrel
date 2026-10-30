import { BASE_URL } from "constants.ts";
import { HealPotionCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/heal-potions/T.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/heal-potions/back.png`;

type TenHealPasteboardCardDataType = HealPotionCardType<"T">;

export const tenHealPasteboardCard = {
  identifier: "day0ff:card-pasteboard.heal.T",
  type: "pasteboard",
  name: "card.pasteboard.heal.T.name",
  suit: "heal",
  rank: "T",
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
} as const satisfies TenHealPasteboardCardDataType;
