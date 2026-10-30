import { skeletonQueenPasteboardCard } from "entities/cards/pasteboard/skeleton/SkeletonQueen.ts";
import { roomEntryPhase } from "entities/phases/roomEntry.ts";
import type { SkeletonPasteboardDataType } from "./types.ts";

export const skeletonQueenPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.Q.skeletonQueen",
  name: "pasteboard.skeleton.Q.skeletonQueen.name",
  description: "pasteboard.skeleton.Q.skeletonQueen.description",
  card: skeletonQueenPasteboardCard,
  suit: "skeleton",
  rank: "Q",
  variant: "skeletonQueen",
  role: "enemy",
  actions: [
    {
      id: "drainPotions",
      phase: roomEntryPhase.identifier,
      type: "drainPotions",
      animation: {
        borderColor: "skyblue",
        glowColor: "skyblue",
        shake: true,
      },
    },
  ],
  isLocked: false,
  isNotFound: false,
} as const satisfies SkeletonPasteboardDataType<"Q", "skeletonQueen">;
