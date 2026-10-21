import {healEffect} from "entities/effects/heal.ts";
import {afterCardPlayedPhase} from "entities/phases/afterCardPlayed.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { HealPasteboardDataType } from "./types.ts";

type KingHealPasteboardDataType = HealPasteboardDataType<"K">;

export const kingHealPasteboard = {
  identifier: "day0ff:pasteboard-heal.K",
  name: "pasteboard.heal.K.name",
  description: "pasteboard.heal.K.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.heal.K"],
  suit: "heal",
  role: "potion",
  rank: "K",
  effects: [{effect: healEffect.identifier, phase: afterCardPlayedPhase.identifier, target: "hero", amount: 13}],
  isLocked: false,
  isNotFound: false,
} as const satisfies KingHealPasteboardDataType;
