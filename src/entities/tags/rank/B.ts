import { RankTagType } from "./types.ts";

type BilletRankTagDataType = RankTagType<"B">;

export const billetRankTag = {
  identifier: "day0ff:tag-rank.B",
  rank: "B",
  name: "tag.rank.B.name",
  description: "tag.rank.B.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies BilletRankTagDataType;
