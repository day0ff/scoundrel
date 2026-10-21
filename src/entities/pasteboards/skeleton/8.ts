import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { SkeletonPasteboardDataType } from "./types.ts";

type EightSkeletonPasteboardDataType = SkeletonPasteboardDataType<'8'>;

export const eightSkeletonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.8",
  name: "pasteboard.skeleton.8.name",
  description: "pasteboard.skeleton.8.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.8"],
  suit: "skeleton",
  role: "enemy",
  rank: "8",
  isLocked: false,
  isNotFound: false,
} as const satisfies EightSkeletonPasteboardDataType;
