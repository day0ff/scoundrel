import { BASE_URL } from "constants.ts";
import type {FistCardType} from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/fist/X.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/fist/back.png`;

type ZeroFistPasteboardCardDataType = FistCardType<'0'>;

export const zeroFistPasteboardCard = {
  identifier: "day0ff:card-pasteboard.fist.0",
  type: "pasteboard",
  name: "card.pasteboard.fist.0.name",
  suit: "fist",
  rank: "0",
  color: "sienna",
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
} as const satisfies ZeroFistPasteboardCardDataType;
