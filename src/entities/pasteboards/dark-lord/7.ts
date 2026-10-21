import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { DarkLordPasteboardDataType } from "./types.ts";

type SevenDarkLordPasteboardDataType = DarkLordPasteboardDataType<'7'>;

export const sevenDarkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.7",
  name: "pasteboard.dark.7.name",
  description: "pasteboard.dark.7.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.7"],
  suit: "dark",
  role: "enemy",
  rank: "7",
  isLocked: false,
  isNotFound: false,
} as const satisfies SevenDarkLordPasteboardDataType;
