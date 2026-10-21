import {TagDataType} from "../types.ts";
import {RankType} from "../../types.ts";

export type RankTagType<RankTypeType extends RankType> = TagDataType<'rank', RankTypeType> & {
    rank: RankTypeType;
};