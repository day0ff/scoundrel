import { BASE_URL } from "constants.ts";
import { DarkLordCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/dark-lord/45.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/dark-lord/back.png`;

type FiveDarkLordPasteboardCardDataType = DarkLordCardType<'5'>;

export const fiveDarkLordPasteboardCard = {
  identifier: "day0ff:card-pasteboard.dark.5",
  type: "pasteboard",
  name: "card.pasteboard.dark.5.name",
  suit: "dark",
  rank: "5",
  color: "#333",
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
} as const satisfies FiveDarkLordPasteboardCardDataType;
