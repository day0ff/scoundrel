import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { SkeletonPasteboardDataType } from "./types.ts";

type AceSkeletonPasteboardDataType = SkeletonPasteboardDataType<'A'>;

export const aceSkeletonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.A",
  name: "pasteboard.skeleton.A.name",
  description: "pasteboard.skeleton.A.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.A"],
  suit: "skeleton",
  role: "enemy",
  rank: "A",
  isLocked: false,
  isNotFound: false,
} as const satisfies AceSkeletonPasteboardDataType;
