import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { SkeletonPasteboardDataType } from "./types.ts";

type BilletSkeletonPasteboardDataType = SkeletonPasteboardDataType<'B'>;

export const billetSkeletonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.B",
  name: "pasteboard.skeleton.B.name",
  description: "pasteboard.skeleton.B.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.B"],
  suit: "skeleton",
  role: "enemy",
  rank: "B",
  isLocked: false,
  isNotFound: false,
} as const satisfies BilletSkeletonPasteboardDataType;
