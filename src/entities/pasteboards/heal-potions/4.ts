import {healEffect} from "entities/effects/heal.ts";
import {afterCardPlayedPhase} from "entities/phases/afterCardPlayed.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { HealPasteboardDataType } from "./types.ts";

type FourHealPasteboardDataType = HealPasteboardDataType<"4">;

export const fourHealPasteboard = {
  identifier: "day0ff:pasteboard-heal.4",
  name: "pasteboard.heal.4.name",
  description: "pasteboard.heal.4.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.heal.4"],
  suit: "heal",
  role: "potion",
  rank: "4",
  effects: [{effect: healEffect.identifier, phase: afterCardPlayedPhase.identifier, target: "hero", amount: 4}],
  isLocked: false,
  isNotFound: false,
} as const satisfies FourHealPasteboardDataType;
