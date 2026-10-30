import { BASE_URL } from "constants.ts";
import { DarkLordCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/dark-lord/67.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/dark-lord/back.png`;

type SevenDarkLordPasteboardCardDataType = DarkLordCardType<'7'>;

export const sevenDarkLordPasteboardCard = {
  identifier: "day0ff:card-pasteboard.dark.7",
  type: "pasteboard",
  name: "card.pasteboard.dark.7.name",
  suit: "dark",
  rank: "7",
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
} as const satisfies SevenDarkLordPasteboardCardDataType;
