import { RankTagType } from "./types.ts";

type FiveRankTagDataType = RankTagType<"5">;

export const fiveRankTag = {
  identifier: "day0ff:tag-rank.5",
  rank: "5",
  name: "tag.rank.5.name",
  description: "tag.rank.5.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies FiveRankTagDataType;
