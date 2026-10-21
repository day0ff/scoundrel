import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { DarkLordPasteboardDataType } from "./types.ts";

type BilletDarkLordPasteboardDataType = DarkLordPasteboardDataType<'B'>;

export const billetDarkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.B",
  name: "pasteboard.dark.B.name",
  description: "pasteboard.dark.B.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.B"],
  suit: "dark",
  role: "enemy",
  rank: "B",
  isLocked: false,
  isNotFound: false,
} as const satisfies BilletDarkLordPasteboardDataType;
