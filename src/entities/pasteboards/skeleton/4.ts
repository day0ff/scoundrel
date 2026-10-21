import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { SkeletonPasteboardDataType } from "./types.ts";

type FourSkeletonPasteboardDataType = SkeletonPasteboardDataType<'4'>;

export const fourSkeletonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.4",
  name: "pasteboard.skeleton.4.name",
  description: "pasteboard.skeleton.4.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.4"],
  suit: "skeleton",
  role: "enemy",
  rank: "4",
  isLocked: false,
  isNotFound: false,
} as const satisfies FourSkeletonPasteboardDataType;
