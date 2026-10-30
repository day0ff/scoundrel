import { BASE_URL } from "constants.ts";
import { roomEntryPhase } from "entities/phases/roomEntry.ts";
import { aceDarkLordPasteboard } from "./A.ts";
import type { DarkLordPasteboardDataType } from "./types.ts";

export const darkDragonPasteboard = {
  ...aceDarkLordPasteboard,
  identifier: "day0ff:pasteboard-dark.A.darkDragon",
  name: "pasteboard.dark.A.darkDragon.name",
  description: "pasteboard.dark.A.darkDragon.description",
  variant: "darkDragon",
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
