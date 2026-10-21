import { RankTagType } from "./types.ts";

type SevenRankTagDataType = RankTagType<"7">;

export const sevenRankTag = {
  identifier: "day0ff:tag-rank.7",
  rank: "7",
  name: "tag.rank.7.name",
  description: "tag.rank.7.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies SevenRankTagDataType;
