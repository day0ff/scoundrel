import { roomEntryPhase } from "entities/phases/roomEntry.ts";
import { osteomancerPasteboardCard } from "entities/cards/pasteboard/skeleton/Osteomancer.ts";
import type { SkeletonPasteboardDataType } from "./types.ts";

export const osteomancerPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.F.osteomancer",
  name: "pasteboard.skeleton.F.osteomancer.name",
  description: "pasteboard.skeleton.F.osteomancer.description",
  card: osteomancerPasteboardCard,
  suit: "skeleton",
  variant: "osteomancer",
  rank: "F",
  role: "enemy",
  strength: 1,
  actions: [
    {
      id: "summon",
      phase: roomEntryPhase.identifier,
      type: "summon",
      animation: {
        borderColor: "skyblue",
        glowColor: "skyblue",
        swing: true,
      },
      identifier: "day0ff:pasteboard-skeleton.F.thing",
      source: "existingOrCreate",
    },
  ],
  isLocked: false,
  isNotFound: false,
} as const satisfies SkeletonPasteboardDataType<"F", "osteomancer">;
