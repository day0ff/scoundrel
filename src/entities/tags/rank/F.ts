import { RankTagType } from "./types.ts";

type FoolRankTagDataType = RankTagType<"F">;

export const foolRankTag = {
  identifier: "day0ff:tag-rank.F",
  rank: "F",
  name: "tag.rank.F.name",
  description: "tag.rank.F.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies FoolRankTagDataType;
