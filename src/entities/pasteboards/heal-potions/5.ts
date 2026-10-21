import {healEffect} from "entities/effects/heal.ts";
import {afterCardPlayedPhase} from "entities/phases/afterCardPlayed.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { HealPasteboardDataType } from "./types.ts";

type FiveHealPasteboardDataType = HealPasteboardDataType<"5">;

export const fiveHealPasteboard = {
  identifier: "day0ff:pasteboard-heal.5",
  name: "pasteboard.heal.5.name",
  description: "pasteboard.heal.5.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.heal.5"],
  suit: "heal",
  role: "potion",
  rank: "5",
  effects: [{effect: healEffect.identifier, phase: afterCardPlayedPhase.identifier, target: "hero", amount: 5}],
  isLocked: false,
  isNotFound: false,
} as const satisfies FiveHealPasteboardDataType;
