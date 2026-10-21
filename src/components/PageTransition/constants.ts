import {PASTEBOARD_CARDS_MAP} from "entities/cards/pasteboard/constants.ts";
import type {CurtainCornerType} from "./types.ts";

export const CURTAIN_DURATION_MS = 250;
export const CARD_REVEAL_DURATION_MS = 250;
export const CARD_BACK_HOLD_DURATION_MS = 250;
export const CARD_RETURN_HOLD_DURATION_MS = 200;
export const CARD_FADE_DURATION_MS = 150;
export const CARD_EXIT_DURATION_MS = CARD_REVEAL_DURATION_MS + CARD_RETURN_HOLD_DURATION_MS + CARD_FADE_DURATION_MS;
export const CARD_PRELOAD_TIMEOUT_MS = 2000;
// Blank placeholder cards are not playable and some reference missing back artwork.
export const TRANSITION_CARDS = Object.values(PASTEBOARD_CARDS_MAP).filter(({rank}) => rank !== "B");

export const CURTAIN_CORNERS: readonly CurtainCornerType[] = [
    "top-left", "top-right", "bottom-left", "bottom-right",
];

export const CURTAIN_OFFSETS = {
    "top-left": "calc(-1 * var(--curtain-distance)), calc(-1 * var(--curtain-distance))",
    "top-right": "var(--curtain-distance), calc(-1 * var(--curtain-distance))",
    "bottom-left": "calc(-1 * var(--curtain-distance)), var(--curtain-distance)",
    "bottom-right": "var(--curtain-distance), var(--curtain-distance)",
} satisfies Record<CurtainCornerType, string>;
