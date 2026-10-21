import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { SkeletonPasteboardDataType } from "./types.ts";

type ThreeSkeletonPasteboardDataType = SkeletonPasteboardDataType<'3'>;

export const threeSkeletonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.3",
  name: "pasteboard.skeleton.3.name",
  description: "pasteboard.skeleton.3.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.3"],
  suit: "skeleton",
  role: "enemy",
  rank: "3",
  isLocked: false,
  isNotFound: false,
} as const satisfies ThreeSkeletonPasteboardDataType;
