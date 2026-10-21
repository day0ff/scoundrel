import type {PasteboardRoleType} from "entities/pasteboards/types.ts";

export const CARD_INTERACTION_COLORS = {
    fist: "chocolate",
    weapon: "blue",
    potion: "red",
    enemy: "deeppink",
} as const satisfies Record<PasteboardRoleType, string>;
