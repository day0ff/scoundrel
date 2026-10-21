import {CardDataType} from "../types.ts";

export type HeroCardType<Subtype extends string> = CardDataType<'hero', Subtype>;