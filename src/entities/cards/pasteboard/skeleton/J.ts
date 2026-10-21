import { BASE_URL } from "constants.ts";
import { SkeletonCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/skeleton/J.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/skeleton/back.png`;

type JackSkeletonPasteboardCardDataType = SkeletonCardType<'J'>;

export const jackSkeletonPasteboardCard = {
  identifier: "day0ff:card-pasteboard.skeleton.J",
  type: "pasteboard",
  name: "card.pasteboard.skeleton.J.name",
  suit: "skeleton",
  rank: "J",
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
} as const satisfies JackSkeletonPasteboardCardDataType;
