import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { DarkLordPasteboardDataType } from "./types.ts";

type OneDarkLordPasteboardDataType = DarkLordPasteboardDataType<"1">;

export const oneDarkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.1",
  name: "pasteboard.dark.1.name",
  description: "pasteboard.dark.1.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.1"],
  suit: "dark",
  role: "enemy",
  rank: "1",
  actions: [
    {
      id: "hatchDragon",
      phase: "day0ff:phase-playerAction",
      type: "hatchOnAttack",
      identifier: "day0ff:pasteboard-dark.A",
    },
  ],
  isLocked: false,
  isNotFound: false,
} as const satisfies OneDarkLordPasteboardDataType;
