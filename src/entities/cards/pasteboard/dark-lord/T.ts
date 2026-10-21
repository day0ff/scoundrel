import { BASE_URL } from "constants.ts";
import { DarkLordCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/dark-lord/X.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/dark-lord/back.png`;

type TenDarkLordPasteboardCardDataType = DarkLordCardType<'T'>;

export const tenDarkLordPasteboardCard = {
  identifier: "day0ff:card-pasteboard.dark.T",
  type: "pasteboard",
  name: "card.pasteboard.dark.T.name",
  suit: "dark",
  rank: "T",
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
} as const satisfies TenDarkLordPasteboardCardDataType;
