import { BASE_URL } from "constants.ts";
import { DarkLordCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/dark-lord/X.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/dark-lord/back.png`;

type TwoDarkLordPasteboardCardDataType = DarkLordCardType<'2'>;

export const twoDarkLordPasteboardCard = {
  identifier: "day0ff:card-pasteboard.dark.2",
  type: "pasteboard",
  name: "card.pasteboard.dark.2.name",
  suit: "dark",
  rank: "2",
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
} as const satisfies TwoDarkLordPasteboardCardDataType;
