import {TranslationKeysType} from "localization/types.ts";
import {DeckCardType} from "../cards/decks/types.ts";
import {CollectionType, IdentifierType, RankType} from "../types";
import {InitPasteboardDataType, PasteboardDataType} from "../pasteboards/types.ts";

type DeckTranslationKeysType<Type extends string> = Extract<TranslationKeysType, `deck.${Type}.${string}`>;

type DeckType<Identifier extends string, Type extends string> = {
    identifier: IdentifierType<Identifier, Type>;
    name: DeckTranslationKeysType<Type>;
    description: DeckTranslationKeysType<Type>;
    card: DeckCardType<string>;
    pasteboards: Array<PasteboardDataType<string, RankType>>;
}

export type DeckDataType<Type extends string> = DeckType<"deck", Type> & CollectionType;

export type InitDeckDataType<Type extends string> = Omit<DeckDataType<Type>, 'pasteboards'> & {
    id: string;
    pasteboards: Array<InitPasteboardDataType<string, RankType>>;
};
