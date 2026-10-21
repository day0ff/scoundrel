import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { DarkLordPasteboardDataType } from "./types.ts";

type KingDarkLordPasteboardDataType = DarkLordPasteboardDataType<'K'>;

export const kingDarkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.K",
  name: "pasteboard.dark.K.name",
  description: "pasteboard.dark.K.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.K"],
  suit: "dark",
  role: "enemy",
  rank: "K",
  isLocked: false,
  isNotFound: false,
} as const satisfies KingDarkLordPasteboardDataType;
