import { BASE_URL } from "constants.ts";
import { DarkLordCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/dark-lord/Q.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/dark-lord/back.png`;

type QueenDarkLordPasteboardCardDataType = DarkLordCardType<'Q'>;

export const queenDarkLordPasteboardCard = {
  identifier: "day0ff:card-pasteboard.dark.Q",
  type: "pasteboard",
  name: "card.pasteboard.dark.Q.name",
  suit: "dark",
  rank: "Q",
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
} as const satisfies QueenDarkLordPasteboardCardDataType;
