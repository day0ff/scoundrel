import { BASE_URL } from "constants.ts";
import { SkeletonCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/skeleton/Q.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/skeleton/back.png`;

export const skeletonQueenPasteboardCard = {
  identifier: "day0ff:card-pasteboard.skeleton.Q.skeletonQueen",
  type: "pasteboard",
  name: "card.pasteboard.skeleton.Q.skeletonQueen.name",
  variant: "skeletonQueen",
  suit: "skeleton",
  rank: "Q",
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
} as const satisfies SkeletonCardType<"Q", "skeletonQueen">;
