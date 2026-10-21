import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { SkeletonPasteboardDataType } from "./types.ts";

type NineSkeletonPasteboardDataType = SkeletonPasteboardDataType<'9'>;

export const nineSkeletonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.9",
  name: "pasteboard.skeleton.9.name",
  description: "pasteboard.skeleton.9.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.9"],
  suit: "skeleton",
  role: "enemy",
  rank: "9",
  isLocked: false,
  isNotFound: false,
} as const satisfies NineSkeletonPasteboardDataType;
