import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { SkeletonPasteboardDataType } from "./types.ts";

type FiveSkeletonPasteboardDataType = SkeletonPasteboardDataType<'5'>;

export const fiveSkeletonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.5",
  name: "pasteboard.skeleton.5.name",
  description: "pasteboard.skeleton.5.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.5"],
  suit: "skeleton",
  role: "enemy",
  rank: "5",
  isLocked: false,
  isNotFound: false,
} as const satisfies FiveSkeletonPasteboardDataType;
