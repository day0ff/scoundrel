import {healEffect} from "entities/effects/heal.ts";
import {afterCardPlayedPhase} from "entities/phases/afterCardPlayed.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { HealPasteboardDataType } from "./types.ts";

type SixHealPasteboardDataType = HealPasteboardDataType<"6">;

export const sixHealPasteboard = {
  identifier: "day0ff:pasteboard-heal.6",
  name: "pasteboard.heal.6.name",
  description: "pasteboard.heal.6.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.heal.6"],
  suit: "heal",
  role: "potion",
  rank: "6",
  effects: [{effect: healEffect.identifier, phase: afterCardPlayedPhase.identifier, target: "hero", amount: 6}],
  isLocked: false,
  isNotFound: false,
} as const satisfies SixHealPasteboardDataType;
