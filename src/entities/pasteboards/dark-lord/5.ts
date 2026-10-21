import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { DarkLordPasteboardDataType } from "./types.ts";

type FiveDarkLordPasteboardDataType = DarkLordPasteboardDataType<'5'>;

export const fiveDarkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.5",
  name: "pasteboard.dark.5.name",
  description: "pasteboard.dark.5.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.5"],
  suit: "dark",
  role: "enemy",
  rank: "5",
  isLocked: false,
  isNotFound: false,
} as const satisfies FiveDarkLordPasteboardDataType;
