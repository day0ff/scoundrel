import { roomEntryPhase } from "entities/phases/roomEntry.ts";
import { kingDarkLordPasteboard } from "./K.ts";
import { darkDragonPasteboard } from "./DarkDragon.ts";
import type { DarkLordPasteboardDataType } from "./types.ts";

export const darkLordPasteboard = {
  ...kingDarkLordPasteboard,
  identifier: "day0ff:pasteboard-dark.K.darkLord",
  name: "pasteboard.dark.K.darkLord.name",
  description: "pasteboard.dark.K.darkLord.description",
  variant: "darkLord",
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
