import {RankType} from "../../types.ts";
import {PasteboardCardDataType} from "../types.ts";

export type PasteboardCardType<SuitType extends string, RankTypeType extends RankType, VariantType extends string = string> = PasteboardCardDataType<'pasteboard', SuitType, RankTypeType, VariantType>;
