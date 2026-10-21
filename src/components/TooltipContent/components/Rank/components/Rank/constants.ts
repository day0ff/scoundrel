import {RankType} from "entities/types.ts";
import {RankTagType} from "entities/tags/rank/types.ts";
import {RANK_TAGS_MAP} from "entities/tags/rank/constants.ts";

export const getRankTagProps = (rank: RankType): RankTagType<RankType> | undefined => {
    const identifier = `day0ff:tag-rank.${rank}` as RankTagType<RankType>["identifier"];

    return RANK_TAGS_MAP[identifier];
}
