import { BASE_URL } from "constants.ts";
import { SkeletonCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/skeleton/A.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/skeleton/back.png`;

type AceSkeletonPasteboardCardDataType = SkeletonCardType<'A'>;

export const aceSkeletonPasteboardCard = {
  identifier: "day0ff:card-pasteboard.skeleton.A",
  type: "pasteboard",
  name: "card.pasteboard.skeleton.A.name",
  suit: "skeleton",
  rank: "A",
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
} as const satisfies AceSkeletonPasteboardCardDataType;
