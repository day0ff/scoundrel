import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { SkeletonPasteboardDataType } from "./types.ts";

type TenSkeletonPasteboardDataType = SkeletonPasteboardDataType<'T'>;

export const tenSkeletonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.T",
  name: "pasteboard.skeleton.T.name",
  description: "pasteboard.skeleton.T.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.T"],
  suit: "skeleton",
  role: "enemy",
  rank: "T",
  isLocked: false,
  isNotFound: false,
} as const satisfies TenSkeletonPasteboardDataType;
