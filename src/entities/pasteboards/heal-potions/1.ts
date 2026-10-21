import {healEffect} from "entities/effects/heal.ts";
import {afterCardPlayedPhase} from "entities/phases/afterCardPlayed.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { HealPasteboardDataType } from "./types.ts";

type OneHealPasteboardDataType = HealPasteboardDataType<"1">;

export const oneHealPasteboard = {
  identifier: "day0ff:pasteboard-heal.1",
  name: "pasteboard.heal.1.name",
  description: "pasteboard.heal.1.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.heal.1"],
  suit: "heal",
  role: "potion",
  rank: "1",
  effects: [{effect: healEffect.identifier, phase: afterCardPlayedPhase.identifier, target: "hero", amount: 1}],
  isLocked: false,
  isNotFound: false,
} as const satisfies OneHealPasteboardDataType;
