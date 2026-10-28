import {RankType} from "../../types.ts";
import {PasteboardDataType} from "../types.ts";

export type SkeletonPasteboardDataType<RankTypeType extends RankType, VariantType extends string = string> = PasteboardDataType<'skeleton', RankTypeType, VariantType>;
