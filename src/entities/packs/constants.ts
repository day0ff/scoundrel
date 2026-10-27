import {v4 as getUuid} from "uuid";
import {initDeck} from "entities/decks/constants.ts";
import {classicPack} from "./classic.ts";
import type {InitPackDataType, PackDataType, PackDeckType} from "./types.ts";

const PACKS_MAP: Record<PackDataType<string>["identifier"], PackDataType<string>> = {
    [classicPack.identifier]: classicPack,
} as const;

export const initPack = (
    identifier: PackDataType<string>["identifier"],
    decks?: PackDeckType[],
): InitPackDataType<string> => {
    const pack = PACKS_MAP[identifier];
    return {
        ...pack,
        id: getUuid(),
        decks: (decks ?? pack.decks).map(deck => initDeck(deck.identifier, deck.cards)),
    };
};

export const allPacks = Object.values(PACKS_MAP);
