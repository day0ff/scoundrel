import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { SkeletonPasteboardDataType } from "./types.ts";

type SixSkeletonPasteboardDataType = SkeletonPasteboardDataType<'6'>;

export const sixSkeletonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.6",
  name: "pasteboard.skeleton.6.name",
  description: "pasteboard.skeleton.6.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.6"],
  suit: "skeleton",
  role: "enemy",
  rank: "6",
  isLocked: false,
  isNotFound: false,
} as const satisfies SixSkeletonPasteboardDataType;
