import {DeckCardType} from "./types.ts";
import {billetDeckCard} from "./billet.ts";
import {darkLordDeckCard} from "./darkLord.ts";
import {healPotionsDeckCard} from "./healPotions.ts";
import {skeletonDeckCard} from "./skeleton.ts";
import {weaponDeckCard} from "./weapon.ts";

export const DECKS_CARDS_MAP: Record<DeckCardType<string>["identifier"], DeckCardType<string>> = {
    "day0ff:card-deck.billet": billetDeckCard,
    "day0ff:card-deck.darkLord": darkLordDeckCard,
    "day0ff:card-deck.healPotions": healPotionsDeckCard,
    "day0ff:card-deck.skeleton": skeletonDeckCard,
    "day0ff:card-deck.weapon": weaponDeckCard,
} as const;
