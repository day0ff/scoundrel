import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { SkeletonPasteboardDataType } from "./types.ts";

type SevenSkeletonPasteboardDataType = SkeletonPasteboardDataType<'7'>;

export const sevenSkeletonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.7",
  name: "pasteboard.skeleton.7.name",
  description: "pasteboard.skeleton.7.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.7"],
  suit: "skeleton",
  role: "enemy",
  rank: "7",
  isLocked: false,
  isNotFound: false,
} as const satisfies SevenSkeletonPasteboardDataType;
