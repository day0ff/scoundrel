import {healEffect} from "entities/effects/heal.ts";
import {afterCardPlayedPhase} from "entities/phases/afterCardPlayed.ts";
import {PASTEBOARD_CARDS_MAP} from "../../cards/pasteboard/constants.ts";
import {HealPasteboardDataType} from "./types.ts";

type AceHealPasteboardDataType = HealPasteboardDataType<"A">;

export const aceHealPasteboard = {
    identifier: "day0ff:pasteboard-heal.A",
    name: 'pasteboard.heal.A.name',
    description: 'pasteboard.heal.A.description',
    card: PASTEBOARD_CARDS_MAP["day0ff:card-pasteboard.heal.A"],
    suit: 'heal',
    role: "potion",
    rank: 'A',
    effects: [{effect: healEffect.identifier, phase: afterCardPlayedPhase.identifier, target: "hero", amount: 14}],
    isLocked: false,
    isNotFound: false,
} as const satisfies AceHealPasteboardDataType;