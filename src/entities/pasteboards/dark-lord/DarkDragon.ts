import { BASE_URL } from "constants.ts";
import { PASTEBOARD_CARDS_MAP } from "entities/cards/pasteboard/constants.ts";
import { roomEntryPhase } from "entities/phases/roomEntry.ts";
import type { DarkLordPasteboardDataType } from "./types.ts";

export const darkDragonPasteboard = {
  identifier: "day0ff:pasteboard-dark.A.darkDragon",
  name: "pasteboard.dark.A.darkDragon.name",
  description: "pasteboard.dark.A.darkDragon.description",
  variant: "darkDragon",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.A"],
  suit: "dark",
  role: "enemy",
  rank: "A",
  isLocked: false,
  isNotFound: false,
  actions: [
    {
      id: "roar",
      phase: roomEntryPhase.identifier,
      type: "playSound",
      url: `${BASE_URL}/sounds/roar-dark-dragon.mp3`,
      animation: {
        borderColor: "whitesmoke",
        glowColor: "whitesmoke",
        shake: true,
      },
    },
  ],
} as const satisfies DarkLordPasteboardDataType<"A">;
