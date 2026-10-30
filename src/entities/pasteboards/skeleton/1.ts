import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { SkeletonPasteboardDataType } from "./types.ts";

type OneSkeletonPasteboardDataType = SkeletonPasteboardDataType<'1'>;

export const oneSkeletonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.1",
  name: "pasteboard.skeleton.1.name",
  description: "pasteboard.skeleton.1.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.1"],
  suit: "skeleton",
  role: "enemy",
  rank: "1",
  actions: [{
    id: "hatchDragon",
    phase: "day0ff:phase-playerAction",
    type: "hatchOnAttack",
    identifier: "day0ff:pasteboard-skeleton.A",
  }],
  isLocked: false,
  isNotFound: false,
} as const satisfies OneSkeletonPasteboardDataType;
