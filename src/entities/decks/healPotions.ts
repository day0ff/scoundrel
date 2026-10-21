import {DeckDataType} from "./types.ts";
import {DECKS_CARDS_MAP} from "../cards/decks/constants.ts";
import {allHealPasteBoards} from "../pasteboards/heal-potions/constants.ts";

type HealPotionsDeckDataType = DeckDataType<"healPotions">;

export const healPotionsDeck = {
    identifier: "day0ff:deck-healPotions",
    name: 'deck.healPotions.name',
    description: 'deck.healPotions.description',
    card: DECKS_CARDS_MAP["day0ff:card-deck.healPotions"],
    pasteboards: allHealPasteBoards,
    isLocked: false,
    isNotFound: false,
} as const satisfies HealPotionsDeckDataType;