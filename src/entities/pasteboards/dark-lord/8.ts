import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { DarkLordPasteboardDataType } from "./types.ts";

type EightDarkLordPasteboardDataType = DarkLordPasteboardDataType<'8'>;

export const eightDarkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.8",
  name: "pasteboard.dark.8.name",
  description: "pasteboard.dark.8.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.8"],
  suit: "dark",
  role: "enemy",
  rank: "8",
  isLocked: false,
  isNotFound: false,
} as const satisfies EightDarkLordPasteboardDataType;
