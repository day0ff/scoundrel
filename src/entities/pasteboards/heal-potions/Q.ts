import {healEffect} from "entities/effects/heal.ts";
import {afterCardPlayedPhase} from "entities/phases/afterCardPlayed.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { HealPasteboardDataType } from "./types.ts";

type QueenHealPasteboardDataType = HealPasteboardDataType<"Q">;

export const queenHealPasteboard = {
  identifier: "day0ff:pasteboard-heal.Q",
  name: "pasteboard.heal.Q.name",
  description: "pasteboard.heal.Q.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.heal.Q"],
  suit: "heal",
  role: "potion",
  rank: "Q",
  effects: [{effect: healEffect.identifier, phase: afterCardPlayedPhase.identifier, target: "hero", amount: 12}],
  isLocked: false,
  isNotFound: false,
} as const satisfies QueenHealPasteboardDataType;
