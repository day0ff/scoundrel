import { RankTagType } from "./types.ts";

type TwoRankTagDataType = RankTagType<"2">;

export const twoRankTag = {
  identifier: "day0ff:tag-rank.2",
  rank: "2",
  name: "tag.rank.2.name",
  description: "tag.rank.2.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies TwoRankTagDataType;
