import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { DarkLordPasteboardDataType } from "./types.ts";

type SixDarkLordPasteboardDataType = DarkLordPasteboardDataType<'6'>;

export const sixDarkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.6",
  name: "pasteboard.dark.6.name",
  description: "pasteboard.dark.6.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.6"],
  suit: "dark",
  role: "enemy",
  rank: "6",
  isLocked: false,
  isNotFound: false,
} as const satisfies SixDarkLordPasteboardDataType;
