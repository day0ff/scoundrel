import { RankType } from "../../../types.ts";
import { HealPotionCardType } from "./types.ts";
import { oneHealPasteboardCard } from "./1.ts";
import { twoHealPasteboardCard } from "./2.ts";
import { threeHealPasteboardCard } from "./3.ts";
import { fourHealPasteboardCard } from "./4.ts";
import { fiveHealPasteboardCard } from "./5.ts";
import { sixHealPasteboardCard } from "./6.ts";
import { sevenHealPasteboardCard } from "./7.ts";
import { eightHealPasteboardCard } from "./8.ts";
import { nineHealPasteboardCard } from "./9.ts";
import { tenHealPasteboardCard } from "./T.ts";
import { jackHealPasteboardCard } from "./J.ts";
import { queenHealPasteboardCard } from "./Q.ts";
import { kingHealPasteboardCard } from "./K.ts";
import { aceHealPasteboardCard } from "./A.ts";
import { billetPasteboardCard } from "./B.ts";

export const HEAL_PASTEBOARD_CARDS_MAP = {
  "day0ff:card-pasteboard.heal.1": oneHealPasteboardCard,
  "day0ff:card-pasteboard.heal.2": twoHealPasteboardCard,
  "day0ff:card-pasteboard.heal.3": threeHealPasteboardCard,
  "day0ff:card-pasteboard.heal.4": fourHealPasteboardCard,
  "day0ff:card-pasteboard.heal.5": fiveHealPasteboardCard,
  "day0ff:card-pasteboard.heal.6": sixHealPasteboardCard,
  "day0ff:card-pasteboard.heal.7": sevenHealPasteboardCard,
  "day0ff:card-pasteboard.heal.8": eightHealPasteboardCard,
  "day0ff:card-pasteboard.heal.9": nineHealPasteboardCard,
  "day0ff:card-pasteboard.heal.T": tenHealPasteboardCard,
  "day0ff:card-pasteboard.heal.J": jackHealPasteboardCard,
  "day0ff:card-pasteboard.heal.Q": queenHealPasteboardCard,
  "day0ff:card-pasteboard.heal.K": kingHealPasteboardCard,
  "day0ff:card-pasteboard.heal.A": aceHealPasteboardCard,
  "day0ff:card-pasteboard.heal.B": billetPasteboardCard,
} as const satisfies Partial<
  Record<
    HealPotionCardType<RankType>["identifier"],
    HealPotionCardType<RankType>
  >
>;
