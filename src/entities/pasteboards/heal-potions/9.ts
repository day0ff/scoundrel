import {healEffect} from "entities/effects/heal.ts";
import {afterCardPlayedPhase} from "entities/phases/afterCardPlayed.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { HealPasteboardDataType } from "./types.ts";

type NineHealPasteboardDataType = HealPasteboardDataType<"9">;

export const nineHealPasteboard = {
  identifier: "day0ff:pasteboard-heal.9",
  name: "pasteboard.heal.9.name",
  description: "pasteboard.heal.9.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.heal.9"],
  suit: "heal",
  role: "potion",
  rank: "9",
  effects: [{effect: healEffect.identifier, phase: afterCardPlayedPhase.identifier, target: "hero", amount: 9}],
  isLocked: false,
  isNotFound: false,
} as const satisfies NineHealPasteboardDataType;
