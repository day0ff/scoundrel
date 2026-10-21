import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { DarkLordPasteboardDataType } from "./types.ts";

type ThreeDarkLordPasteboardDataType = DarkLordPasteboardDataType<'3'>;

export const threeDarkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.3",
  name: "pasteboard.dark.3.name",
  description: "pasteboard.dark.3.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.3"],
  suit: "dark",
  role: "enemy",
  rank: "3",
  isLocked: false,
  isNotFound: false,
} as const satisfies ThreeDarkLordPasteboardDataType;
