import { RankType } from "../../types.ts";
import { aceHealPasteboard } from "./A.ts";
import { oneHealPasteboard } from "./1.ts";
import { twoHealPasteboard } from "./2.ts";
import { threeHealPasteboard } from "./3.ts";
import { fourHealPasteboard } from "./4.ts";
import { fiveHealPasteboard } from "./5.ts";
import { sixHealPasteboard } from "./6.ts";
import { sevenHealPasteboard } from "./7.ts";
import { eightHealPasteboard } from "./8.ts";
import { nineHealPasteboard } from "./9.ts";
import { tenHealPasteboard } from "./T.ts";
import { jackHealPasteboard } from "./J.ts";
import { queenHealPasteboard } from "./Q.ts";
import { kingHealPasteboard } from "./K.ts";
import { HealPasteboardDataType } from "./types.ts";

export const PASTEBOARD_HEAL_MAP = {
  "day0ff:pasteboard-heal.A": aceHealPasteboard,
  "day0ff:pasteboard-heal.1": oneHealPasteboard,
  "day0ff:pasteboard-heal.2": twoHealPasteboard,
  "day0ff:pasteboard-heal.3": threeHealPasteboard,
  "day0ff:pasteboard-heal.4": fourHealPasteboard,
  "day0ff:pasteboard-heal.5": fiveHealPasteboard,
  "day0ff:pasteboard-heal.6": sixHealPasteboard,
  "day0ff:pasteboard-heal.7": sevenHealPasteboard,
  "day0ff:pasteboard-heal.8": eightHealPasteboard,
  "day0ff:pasteboard-heal.9": nineHealPasteboard,
  "day0ff:pasteboard-heal.T": tenHealPasteboard,
  "day0ff:pasteboard-heal.J": jackHealPasteboard,
  "day0ff:pasteboard-heal.Q": queenHealPasteboard,
  "day0ff:pasteboard-heal.K": kingHealPasteboard,
} as const satisfies Partial<Record<
  HealPasteboardDataType<RankType>["identifier"],
  HealPasteboardDataType<RankType>
>>;

export const allHealPasteBoards = Object.values(PASTEBOARD_HEAL_MAP);