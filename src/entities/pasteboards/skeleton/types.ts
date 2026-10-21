import {RankType} from "../../types.ts";
import {PasteboardDataType} from "../types.ts";

export type SkeletonPasteboardDataType<RankTypeType extends RankType> = PasteboardDataType<'skeleton', RankTypeType>;
