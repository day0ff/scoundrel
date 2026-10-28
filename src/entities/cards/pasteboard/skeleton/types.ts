import {RankType} from "../../../types.ts";
import {PasteboardCardType} from "../types.ts";

export type SkeletonCardType<RankTypeType extends RankType, VariantType extends string = string> = PasteboardCardType<'skeleton', RankTypeType, VariantType>;
