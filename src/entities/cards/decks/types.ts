import {CardDataType} from "../types.ts";

export type DeckCardType<Subtype extends string> = CardDataType<'deck', Subtype>;