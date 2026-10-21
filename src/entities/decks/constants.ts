import {v4 as getUuid} from "uuid";
import {PasteboardDataType} from "../pasteboards/types.ts";
import {DeckDataType, InitDeckDataType} from "./types";
import {darkLordDeck} from "./darkLord.ts";
import {healPotionsDeck} from "./healPotions.ts";
import {skeletonDeck} from "./skeleton.ts";
import {weaponDeck} from "./weapon.ts";
import {RankType} from "../types.ts";
import {initPasteboard} from "../pasteboards/constants.ts";

const DECKS_MAP: Record<DeckDataType<string>["identifier"], DeckDataType<string>> = {
    "day0ff:deck-darkLord": darkLordDeck,
    "day0ff:deck-skeleton": skeletonDeck,
    "day0ff:deck-healPotions": healPotionsDeck,
    "day0ff:deck-weapon": weaponDeck,
} as const;

export const initDeck = (
    identifier: DeckDataType<string>["identifier"],
    pasteboardIdentifiers?: Array<PasteboardDataType<string, RankType>["identifier"]>,
): InitDeckDataType<string> => {
    const deck = DECKS_MAP[identifier];
    const identifiers = pasteboardIdentifiers ?? deck.pasteboards.map(pasteboard => pasteboard.identifier);
    const initPasteboards = identifiers.map(identifier => initPasteboard(identifier));

    return ({
        ...deck,
        id: getUuid(),
        pasteboards: initPasteboards,
    })
};

export const allDecks = Object.values(DECKS_MAP);