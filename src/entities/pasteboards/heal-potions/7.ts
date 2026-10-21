import {healEffect} from "entities/effects/heal.ts";
import {afterCardPlayedPhase} from "entities/phases/afterCardPlayed.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { HealPasteboardDataType } from "./types.ts";

type SevenHealPasteboardDataType = HealPasteboardDataType<"7">;

export const sevenHealPasteboard = {
  identifier: "day0ff:pasteboard-heal.7",
  name: "pasteboard.heal.7.name",
  description: "pasteboard.heal.7.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.heal.7"],
  suit: "heal",
  role: "potion",
  rank: "7",
  effects: [{effect: healEffect.identifier, phase: afterCardPlayedPhase.identifier, target: "hero", amount: 7}],
  isLocked: false,
  isNotFound: false,
} as const satisfies SevenHealPasteboardDataType;
