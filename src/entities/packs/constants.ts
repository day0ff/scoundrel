import {v4 as getUuid} from "uuid";
import {initDeck} from "entities/decks/constants.ts";
import {classicPack} from "./classic.ts";
import {necromancerPack} from "./necromancer.ts";
import type {InitPackDataType, PackDataType, PackDeckType} from "./types.ts";

export const allPacks: PackDataType<string>[] = [classicPack, necromancerPack];

export const getPack = (identifier: PackDataType<string>["identifier"]) =>
    allPacks.find(pack => pack.identifier === identifier);

export const initPack = (
    identifier: PackDataType<string>["identifier"],
    decks?: PackDeckType[],
): InitPackDataType<string> => {
    const pack = getPack(identifier);
    if (!pack) throw new Error(`Unknown pack: ${identifier}`);
    return {
        ...pack,
        id: getUuid(),
        decks: (decks ?? pack.decks).map(deck => initDeck(deck.identifier, deck.cards)),
    };
};
