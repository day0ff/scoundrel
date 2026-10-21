import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { SkeletonPasteboardDataType } from "./types.ts";

type JackSkeletonPasteboardDataType = SkeletonPasteboardDataType<'J'>;

export const jackSkeletonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.J",
  name: "pasteboard.skeleton.J.name",
  description: "pasteboard.skeleton.J.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.J"],
  suit: "skeleton",
  role: "enemy",
  rank: "J",
  isLocked: false,
  isNotFound: false,
} as const satisfies JackSkeletonPasteboardDataType;
