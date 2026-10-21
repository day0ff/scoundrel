import {healEffect} from "entities/effects/heal.ts";
import {afterCardPlayedPhase} from "entities/phases/afterCardPlayed.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { HealPasteboardDataType } from "./types.ts";

type TwoHealPasteboardDataType = HealPasteboardDataType<"2">;

export const twoHealPasteboard = {
  identifier: "day0ff:pasteboard-heal.2",
  name: "pasteboard.heal.2.name",
  description: "pasteboard.heal.2.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.heal.2"],
  suit: "heal",
  role: "potion",
  rank: "2",
  effects: [{effect: healEffect.identifier, phase: afterCardPlayedPhase.identifier, target: "hero", amount: 2}],
  isLocked: false,
  isNotFound: false,
} as const satisfies TwoHealPasteboardDataType;
