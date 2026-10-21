import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { DarkLordPasteboardDataType } from "./types.ts";

type JackDarkLordPasteboardDataType = DarkLordPasteboardDataType<'J'>;

export const jackDarkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.J",
  name: "pasteboard.dark.J.name",
  description: "pasteboard.dark.J.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.J"],
  suit: "dark",
  role: "enemy",
  rank: "J",
  isLocked: false,
  isNotFound: false,
} as const satisfies JackDarkLordPasteboardDataType;
