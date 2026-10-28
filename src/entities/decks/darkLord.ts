import {DeckDataType} from "./types.ts";
import {DECKS_CARDS_MAP} from "../cards/decks/constants.ts";
import {allDarkPasteBoards} from "../pasteboards/dark-lord/constants.ts";

type DarkLordDeckDataType = DeckDataType<"darkLord">;

export const darkLordDeck = {
    identifier: "day0ff:deck-darkLord",
    name: 'deck.darkLord.name',
    description: 'deck.darkLord.description',
    card: DECKS_CARDS_MAP["day0ff:card-deck.darkLord"],
    styles: {
        text: {
            stroke: "silver",
        },
    },
    pasteboards: allDarkPasteBoards,
    isLocked: true,
    isNotFound: true,
} as const satisfies DarkLordDeckDataType;
