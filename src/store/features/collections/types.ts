import {InitHeroDataType} from "entities/heroes/types.ts";
import {DeckDataType} from "entities/decks/types.ts";

export type CollectionsStateType = {
    heroes: Array<InitHeroDataType<string>>;
    decks: Array<DeckDataType<string>>;
};
