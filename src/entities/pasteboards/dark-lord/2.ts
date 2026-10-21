import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { DarkLordPasteboardDataType } from "./types.ts";

type TwoDarkLordPasteboardDataType = DarkLordPasteboardDataType<'2'>;

export const twoDarkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.2",
  name: "pasteboard.dark.2.name",
  description: "pasteboard.dark.2.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.2"],
  suit: "dark",
  role: "enemy",
  rank: "2",
  isLocked: false,
  isNotFound: false,
} as const satisfies TwoDarkLordPasteboardDataType;
