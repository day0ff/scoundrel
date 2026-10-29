import { BASE_URL } from "constants.ts";
import { SkeletonCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/skeleton/89.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/skeleton/back.png`;

type EightSkeletonPasteboardCardDataType = SkeletonCardType<'8'>;

export const eightSkeletonPasteboardCard = {
  identifier: "day0ff:card-pasteboard.skeleton.8",
  type: "pasteboard",
  name: "card.pasteboard.skeleton.8.name",
  suit: "skeleton",
  rank: "8",
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
} as const satisfies EightSkeletonPasteboardCardDataType;
