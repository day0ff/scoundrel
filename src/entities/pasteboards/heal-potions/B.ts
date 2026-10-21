import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { HealPasteboardDataType } from "./types.ts";

type BilletHealPasteboardDataType = HealPasteboardDataType<'B'>;

export const billetHealPotionsPasteboard = {
  identifier: "day0ff:pasteboard-heal.B",
  name: "pasteboard.heal.B.name",
  description: "pasteboard.heal.B.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.heal.B"],
  suit: "heal",
  role: "potion",
  rank: "B",
  isLocked: false,
  isNotFound: false,
} as const satisfies BilletHealPasteboardDataType;
