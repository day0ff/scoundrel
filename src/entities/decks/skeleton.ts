import {DeckDataType} from "./types.ts";
import {DECKS_CARDS_MAP} from "../cards/decks/constants.ts";
import {allSkeletonPasteBoards} from "../pasteboards/skeleton/constants.ts";

type SkeletonDeckDataType = DeckDataType<"skeleton">;

export const skeletonDeck = {
    identifier: "day0ff:deck-skeleton",
    name: 'deck.skeleton.name',
    description: 'deck.skeleton.description',
    card: DECKS_CARDS_MAP["day0ff:card-deck.skeleton"],
    pasteboards: allSkeletonPasteBoards,
    isLocked: false,
    isNotFound: false,
} as const satisfies SkeletonDeckDataType;