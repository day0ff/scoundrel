import {healEffect} from "entities/effects/heal.ts";
import {afterCardPlayedPhase} from "entities/phases/afterCardPlayed.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { HealPasteboardDataType } from "./types.ts";

type ThreeHealPasteboardDataType = HealPasteboardDataType<"3">;

export const threeHealPasteboard = {
  identifier: "day0ff:pasteboard-heal.3",
  name: "pasteboard.heal.3.name",
  description: "pasteboard.heal.3.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.heal.3"],
  suit: "heal",
  role: "potion",
  rank: "3",
  effects: [{effect: healEffect.identifier, phase: afterCardPlayedPhase.identifier, target: "hero", amount: 3}],
  isLocked: false,
  isNotFound: false,
} as const satisfies ThreeHealPasteboardDataType;
