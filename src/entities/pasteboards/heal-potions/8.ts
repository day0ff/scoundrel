import {healEffect} from "entities/effects/heal.ts";
import {afterCardPlayedPhase} from "entities/phases/afterCardPlayed.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { HealPasteboardDataType } from "./types.ts";

type EightHealPasteboardDataType = HealPasteboardDataType<"8">;

export const eightHealPasteboard = {
  identifier: "day0ff:pasteboard-heal.8",
  name: "pasteboard.heal.8.name",
  description: "pasteboard.heal.8.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.heal.8"],
  suit: "heal",
  role: "potion",
  rank: "8",
  effects: [{effect: healEffect.identifier, phase: afterCardPlayedPhase.identifier, target: "hero", amount: 8}],
  isLocked: false,
  isNotFound: false,
} as const satisfies EightHealPasteboardDataType;
