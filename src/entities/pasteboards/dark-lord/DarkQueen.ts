import { BASE_URL } from "constants.ts";
import { roomEntryPhase } from "entities/phases/roomEntry.ts";
import type { DarkLordPasteboardDataType } from "./types.ts";
import { PASTEBOARD_CARDS_MAP } from "entities/cards/pasteboard/constants.ts";

export const darkQueenPasteboard = {
  identifier: "day0ff:pasteboard-dark.Q.darkQueen",
  name: "pasteboard.dark.Q.darkQueen.name",
  description: "pasteboard.dark.Q.darkQueen.description",
  variant: "darkQueen",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.Q"],
  suit: "dark",
  role: "enemy",
  rank: "Q",
  isLocked: false,
  isNotFound: false,
  actions: [
    {
      id: "breakAllWeapons",
      phase: roomEntryPhase.identifier,
      type: "breakAllWeapons",
      soundUrl: `${BASE_URL}/sounds/banshee-1.mp3`,
      animation: {
        borderColor: "whitesmoke",
        glowColor: "whitesmoke",
        fogColor: "whitesmoke",
        shake: true,
      },
    },
  ],
} as const satisfies DarkLordPasteboardDataType<"Q">;
