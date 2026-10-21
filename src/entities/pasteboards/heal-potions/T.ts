import {healEffect} from "entities/effects/heal.ts";
import {afterCardPlayedPhase} from "entities/phases/afterCardPlayed.ts";
import { PASTEBOARD_CARDS_MAP } from "../../cards/pasteboard/constants.ts";
import { HealPasteboardDataType } from "./types.ts";

type TenHealPasteboardDataType = HealPasteboardDataType<"T">;

export const tenHealPasteboard = {
  identifier: "day0ff:pasteboard-heal.T",
  name: "pasteboard.heal.T.name",
  description: "pasteboard.heal.T.description",
  card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.heal.T"],
  suit: "heal",
  role: "potion",
  rank: "T",
  effects: [{effect: healEffect.identifier, phase: afterCardPlayedPhase.identifier, target: "hero", amount: 10}],
  isLocked: false,
  isNotFound: false,
} as const satisfies TenHealPasteboardDataType;
