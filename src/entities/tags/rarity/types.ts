import {TagDataType} from "../types.ts";

export type RarityTagType<Subtype extends string> = TagDataType<'rarity', Subtype>;