import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { DarkLordPasteboardDataType } from "./types.ts";

type TenDarkLordPasteboardDataType = DarkLordPasteboardDataType<'T'>;

export const tenDarkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.T",
  name: "pasteboard.dark.T.name",
  description: "pasteboard.dark.T.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.T"],
  suit: "dark",
  role: "enemy",
  rank: "T",
  isLocked: false,
  isNotFound: false,
} as const satisfies TenDarkLordPasteboardDataType;
