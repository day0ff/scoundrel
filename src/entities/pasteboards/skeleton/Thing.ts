import { roomEntryPhase } from "entities/phases/roomEntry.ts";
import { thingPasteboardCard } from "entities/cards/pasteboard/skeleton/Thing.ts";
import type { SkeletonPasteboardDataType } from "./types.ts";

export const thingPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.F.thing",
  name: "pasteboard.skeleton.F.thing.name",
  description: "pasteboard.skeleton.F.thing.description",
  card: thingPasteboardCard,
  suit: "skeleton",
  variant: "thing",
  rank: "F",
  role: "enemy",
  strength: 1,
  actions: [
    {
      id: "consume",
      phase: roomEntryPhase.identifier,
      type: "consumeEnemies",
      animation: {
        borderColor: "skyblue",
        glowColor: "skyblue",
        shake: true,
        swing: true,
      },
    },
  ],
  isLocked: false,
  isNotFound: false,
} as const satisfies SkeletonPasteboardDataType<"F", "thing">;
