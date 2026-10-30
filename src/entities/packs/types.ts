import type {TranslationKeysType} from "localization/types.ts";
import type {PackCardType} from "entities/cards/packs/types.ts";
import type {DeckDataType, InitDeckDataType} from "entities/decks/types.ts";
import type {PasteboardDataType} from "entities/pasteboards/types.ts";
import type {CollectionType, IdentifierType, RankType} from "entities/types.ts";

type PackTranslationKeysType<Type extends string> = Extract<TranslationKeysType, `pack.${Type}.${string}`>;

export type PackDeckType = {
    identifier: DeckDataType<string>["identifier"];
    // Omit to use the deck's default cards; an empty array creates an empty deck.
    cards?: Array<PasteboardDataType<string, RankType>["identifier"]>;
};

type PackType<Identifier extends string, Type extends string> = {
    identifier: IdentifierType<Identifier, Type>;
    name: PackTranslationKeysType<Type>;
    description: PackTranslationKeysType<Type>;
    card: PackCardType<string>;
    overlayImage?: string;
    castle: string;
    room: string;
    dungeon: string;
    discard: string;
    crypt: string;
    styles?: DeckDataType<string>["styles"];
    decks: PackDeckType[];
};

export type PackDataType<Type extends string> = PackType<"pack", Type> & CollectionType;

export type PackIdentifierType = PackDataType<string>["identifier"];

export type InitPackDataType<Type extends string> = Omit<PackDataType<Type>, "decks"> & {
    id: string;
    decks: InitDeckDataType<string>[];
};
