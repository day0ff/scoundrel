import { BASE_URL } from "constants.ts";
import { roomEntryPhase } from "entities/phases/roomEntry.ts";
import { commanderPasteboardCard } from "entities/cards/pasteboard/dark-lord/Commander.ts";
import type { DarkLordPasteboardDataType } from "./types.ts";

export const commanderPasteboard = {
  identifier: "day0ff:pasteboard-dark.F.commander",
  name: "pasteboard.dark.F.commander.name",
  description: "pasteboard.dark.F.commander.description",
  variant: "commander",
  card: commanderPasteboardCard,
  suit: "dark",
  role: "enemy",
  rank: "F",
  strength: 11,
  isLocked: false,
  isNotFound: false,
  actions: [
    {
      id: "reinforcement",
      phase: roomEntryPhase.identifier,
      type: "call",
      source: "dungeonOrDiscard",
      soundUrl: `${BASE_URL}/sounds/call-3.mp3`,
      soundWaves: true,
      animation: {
        borderColor: "whitesmoke",
        glowColor: "whitesmoke",
      },
    },
  ],
} as const satisfies DarkLordPasteboardDataType<"F">;
