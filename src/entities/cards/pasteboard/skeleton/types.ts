import {RankType} from "../../../types.ts";
import {PasteboardCardType} from "../types.ts";

export type SkeletonCardType<RankTypeType extends RankType> = PasteboardCardType<'skeleton', RankTypeType>;
