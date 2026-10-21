import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { SkeletonPasteboardDataType } from "./types.ts";

type TwoSkeletonPasteboardDataType = SkeletonPasteboardDataType<'2'>;

export const twoSkeletonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.2",
  name: "pasteboard.skeleton.2.name",
  description: "pasteboard.skeleton.2.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.2"],
  suit: "skeleton",
  role: "enemy",
  rank: "2",
  isLocked: false,
  isNotFound: false,
} as const satisfies TwoSkeletonPasteboardDataType;
