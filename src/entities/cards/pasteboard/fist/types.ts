import type {RankType} from "../../../types.ts";
import type {PasteboardCardType} from "../types.ts";

export type FistCardType<RankTypeType extends RankType> = PasteboardCardType<'fist', RankTypeType>;
