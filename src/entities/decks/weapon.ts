import {DeckDataType} from "./types.ts";
import {DECKS_CARDS_MAP} from "../cards/decks/constants.ts";
import {allWeaponPasteBoards} from "../pasteboards/weapon/constants.ts";

type WeaponDeckDataType = DeckDataType<"weapon">;

export const weaponDeck = {
    identifier: "day0ff:deck-weapon",
    name: 'deck.weapon.name',
    description: 'deck.weapon.description',
    card: DECKS_CARDS_MAP["day0ff:card-deck.weapon"],
    pasteboards: allWeaponPasteBoards,
    isLocked: false,
    isNotFound: false,
} as const satisfies WeaponDeckDataType;