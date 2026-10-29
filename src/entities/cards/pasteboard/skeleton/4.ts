import { BASE_URL } from "constants.ts";
import { SkeletonCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/skeleton/45.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/skeleton/back.png`;

type FourSkeletonPasteboardCardDataType = SkeletonCardType<'4'>;

export const fourSkeletonPasteboardCard = {
  identifier: "day0ff:card-pasteboard.skeleton.4",
  type: "pasteboard",
  name: "card.pasteboard.skeleton.4.name",
  suit: "skeleton",
  rank: "4",
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
} as const satisfies FourSkeletonPasteboardCardDataType;
