import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { DarkLordPasteboardDataType } from "./types.ts";

type QueenDarkLordPasteboardDataType = DarkLordPasteboardDataType<'Q'>;

export const queenDarkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.Q",
  name: "pasteboard.dark.Q.name",
  description: "pasteboard.dark.Q.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.Q"],
  suit: "dark",
  role: "enemy",
  rank: "Q",
  isLocked: false,
  isNotFound: false,
} as const satisfies QueenDarkLordPasteboardDataType;
