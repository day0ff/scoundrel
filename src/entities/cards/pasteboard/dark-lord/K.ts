import { BASE_URL } from "constants.ts";
import { DarkLordCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/dark-lord/K.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/dark-lord/back.png`;

type KingDarkLordPasteboardCardDataType = DarkLordCardType<'K'>;

export const kingDarkLordPasteboardCard = {
  identifier: "day0ff:card-pasteboard.dark.K",
  type: "pasteboard",
  name: "card.pasteboard.dark.K.name",
  suit: "dark",
  rank: "K",
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
} as const satisfies KingDarkLordPasteboardCardDataType;
