import { BASE_URL } from "constants.ts";
import { roomEntryPhase } from "entities/phases/roomEntry.ts";
import { assassinPasteboardCard } from "entities/cards/pasteboard/dark-lord/Assassin.ts";
import type { DarkLordPasteboardDataType } from "./types.ts";

export const assassinPasteboard = {
  identifier: "day0ff:pasteboard-dark.F.assassin",
  name: "pasteboard.dark.F.assassin.name",
  description: "pasteboard.dark.F.assassin.description",
  variant: "assassin",
  card: assassinPasteboardCard,
  suit: "dark",
  role: "enemy",
  rank: "F",
  strength: 10,
  isLocked: false,
  isNotFound: false,
  actions: [
    {
      id: "instantAttack",
      phase: roomEntryPhase.identifier,
      type: "instantAttack",
      soundUrl: `${BASE_URL}/sounds/call-2.mp3`,
    },
  ],
} as const satisfies DarkLordPasteboardDataType<"F">;
