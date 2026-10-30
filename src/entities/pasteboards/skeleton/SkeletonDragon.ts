import { BASE_URL } from "constants.ts";
import { roomEntryPhase } from "entities/phases/roomEntry.ts";
import { PASTEBOARD_CARDS_MAP } from "entities/cards/pasteboard/constants.ts";
import type { SkeletonPasteboardDataType } from "./types.ts";

export const skeletonDragonPasteboard = {
  identifier: "day0ff:pasteboard-skeleton.A.skeletonDragon",
  name: "pasteboard.skeleton.A.skeletonDragon.name",
  description: "pasteboard.skeleton.A.skeletonDragon.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.skeleton.A"],
  variant: "skeletonDragon",
  suit: "skeleton",
  role: "enemy",
  rank: "A",
  actions: [
    {
      id: "roar",
      phase: roomEntryPhase.identifier,
      type: "playSound",
      url: `${BASE_URL}/sounds/roar-skelton-dragon.mp3`,
      animation: {
        borderColor: "skyblue",
        glowColor: "skyblue",
        shake: true,
      },
    },
  ],
  isLocked: false,
  isNotFound: false,
} as const satisfies SkeletonPasteboardDataType<"A", "skeletonDragon">;
