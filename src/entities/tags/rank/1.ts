import {RankTagType} from "./types.ts";

type OneRankTagDataType = RankTagType<"1">;

export const oneRankTag = {
    identifier: "day0ff:tag-rank.1",
    rank: "1",
    name: 'tag.rank.1.name',
    description: 'tag.rank.1.description',
    style: {
        fontWeight: 'bold',
    },
} as const satisfies OneRankTagDataType;