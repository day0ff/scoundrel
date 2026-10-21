import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { DarkLordPasteboardDataType } from "./types.ts";

type NineDarkLordPasteboardDataType = DarkLordPasteboardDataType<'9'>;

export const nineDarkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.9",
  name: "pasteboard.dark.9.name",
  description: "pasteboard.dark.9.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.9"],
  suit: "dark",
  role: "enemy",
  rank: "9",
  isLocked: false,
  isNotFound: false,
} as const satisfies NineDarkLordPasteboardDataType;
