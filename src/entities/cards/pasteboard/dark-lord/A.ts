import { BASE_URL } from "constants.ts";
import { DarkLordCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/dark-lord/A.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/dark-lord/back.png`;

type AceDarkLordPasteboardCardDataType = DarkLordCardType<'A'>;

export const aceDarkLordPasteboardCard = {
  identifier: "day0ff:card-pasteboard.dark.A",
  type: "pasteboard",
  name: "card.pasteboard.dark.A.name",
  suit: "dark",
  rank: "A",
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
} as const satisfies AceDarkLordPasteboardCardDataType;
