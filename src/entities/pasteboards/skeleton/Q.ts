import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { SkeletonPasteboardDataType } from "./types.ts";

type QueenSkeletonPasteboardDataType = SkeletonPasteboardDataType<'Q'>;

export const queenSkeletonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.Q",
  name: "pasteboard.skeleton.Q.name",
  description: "pasteboard.skeleton.Q.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.Q"],
  suit: "skeleton",
  role: "enemy",
  rank: "Q",
  isLocked: false,
  isNotFound: false,
} as const satisfies QueenSkeletonPasteboardDataType;
