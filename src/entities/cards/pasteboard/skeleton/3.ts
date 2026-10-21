import { BASE_URL } from "constants.ts";
import { SkeletonCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/skeleton/X.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/skeleton/back.png`;

type ThreeSkeletonPasteboardCardDataType = SkeletonCardType<'3'>;

export const threeSkeletonPasteboardCard = {
  identifier: "day0ff:card-pasteboard.skeleton.3",
  type: "pasteboard",
  name: "card.pasteboard.skeleton.3.name",
  suit: "skeleton",
  rank: "3",
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
} as const satisfies ThreeSkeletonPasteboardCardDataType;
