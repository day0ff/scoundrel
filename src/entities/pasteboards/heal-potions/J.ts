import {healEffect} from "entities/effects/heal.ts";
import {afterCardPlayedPhase} from "entities/phases/afterCardPlayed.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { HealPasteboardDataType } from "./types.ts";

type JackHealPasteboardDataType = HealPasteboardDataType<"J">;

export const jackHealPasteboard = {
  identifier: "day0ff:pasteboard-heal.J",
  name: "pasteboard.heal.J.name",
  description: "pasteboard.heal.J.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.heal.J"],
  suit: "heal",
  role: "potion",
  rank: "J",
  effects: [{effect: healEffect.identifier, phase: afterCardPlayedPhase.identifier, target: "hero", amount: 11}],
  isLocked: false,
  isNotFound: false,
} as const satisfies JackHealPasteboardDataType;
