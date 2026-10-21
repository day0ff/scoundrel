import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { SkeletonPasteboardDataType } from "./types.ts";

type KingSkeletonPasteboardDataType = SkeletonPasteboardDataType<'K'>;

export const kingSkeletonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.K",
  name: "pasteboard.skeleton.K.name",
  description: "pasteboard.skeleton.K.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.K"],
  suit: "skeleton",
  role: "enemy",
  rank: "K",
  isLocked: false,
  isNotFound: false,
} as const satisfies KingSkeletonPasteboardDataType;
