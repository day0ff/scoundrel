import {RankType} from "../../../types.ts";
import {PasteboardCardType} from "../types.ts";

export type HealPotionCardType<RankTypeType extends RankType> = PasteboardCardType<'heal', RankTypeType>;