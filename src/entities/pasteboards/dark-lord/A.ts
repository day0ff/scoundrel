import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { DarkLordPasteboardDataType } from "./types.ts";

type AceDarkLordPasteboardDataType = DarkLordPasteboardDataType<'A'>;

export const aceDarkLordPasteboard = {
  identifier: "day0ff:pasteboard-dark.A",
  name: "pasteboard.dark.A.name",
  description: "pasteboard.dark.A.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.dark.A"],
  suit: "dark",
  role: "enemy",
  rank: "A",
  isLocked: false,
  isNotFound: false,
} as const satisfies AceDarkLordPasteboardDataType;
