import { BASE_URL } from "constants.ts";
import { SkeletonCardType } from "./types.ts";

const faceBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const faceImagePath = `${BASE_URL}/images/decks/skeleton/T.png`;
const backBasePath = `${BASE_URL}/images/cards/base/white-paper.png`;
const backImagePath = `${BASE_URL}/images/decks/skeleton/back.png`;

type TenSkeletonPasteboardCardDataType = SkeletonCardType<'T'>;

export const tenSkeletonPasteboardCard = {
  identifier: "day0ff:card-pasteboard.skeleton.T",
  type: "pasteboard",
  name: "card.pasteboard.skeleton.T.name",
  suit: "skeleton",
  rank: "T",
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
} as const satisfies TenSkeletonPasteboardCardDataType;
