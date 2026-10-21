import { BASE_URL } from "constants.ts";
import { SkeletonCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/skeleton/K.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/skeleton/back.png`;

type KingSkeletonPasteboardCardDataType = SkeletonCardType<'K'>;

export const kingSkeletonPasteboardCard = {
  identifier: "day0ff:card-pasteboard.skeleton.K",
  type: "pasteboard",
  name: "card.pasteboard.skeleton.K.name",
  suit: "skeleton",
  rank: "K",
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
} as const satisfies KingSkeletonPasteboardCardDataType;
