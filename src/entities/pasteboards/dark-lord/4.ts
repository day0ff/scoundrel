import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { DarkLordPasteboardDataType } from "./types.ts";

type FourDarkLordPasteboardDataType = DarkLordPasteboardDataType<'4'>;

export const fourDarkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.4",
  name: "pasteboard.dark.4.name",
  description: "pasteboard.dark.4.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.4"],
  suit: "dark",
  role: "enemy",
  rank: "4",
  isLocked: false,
  isNotFound: false,
} as const satisfies FourDarkLordPasteboardDataType;
