import { BASE_URL } from "constants.ts";
import { SkeletonCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/skeleton/X.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/skeleton/back.png`;

type OneSkeletonPasteboardCardDataType = SkeletonCardType<'1'>;

export const oneSkeletonPasteboardCard = {
  identifier: "day0ff:card-pasteboard.skeleton.1",
  type: "pasteboard",
  name: "card.pasteboard.skeleton.1.name",
  suit: "skeleton",
  rank: "1",
  color: "gray",
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
} as const satisfies OneSkeletonPasteboardCardDataType;
