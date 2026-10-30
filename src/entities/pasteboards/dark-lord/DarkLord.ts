import { roomEntryPhase } from "entities/phases/roomEntry.ts";
import { darkDragonPasteboard } from "./DarkDragon.ts";
import type { DarkLordPasteboardDataType } from "./types.ts";
import { PASTEBOARD_CARDS_MAP } from "entities/cards/pasteboard/constants.ts";

export const darkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.K.darkLord",
  name: "pasteboard.dark.K.darkLord.name",
  description: "pasteboard.dark.K.darkLord.description",
  variant: "darkLord",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.K"],
  suit: "dark",
  role: "enemy",
  rank: "K",
  isLocked: false,
  isNotFound: false,
  actions: [
    {
      id: "callDragon",
      phase: roomEntryPhase.identifier,
      type: "call",
      identifier: darkDragonPasteboard.identifier,
      animation: {
        borderColor: "whitesmoke",
        glowColor: "whitesmoke",
        swing: true,
      },
    },
  ],
} as const satisfies DarkLordPasteboardDataType<"K">;
