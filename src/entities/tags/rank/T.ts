import { RankTagType } from "./types.ts";

type TenRankTagDataType = RankTagType<"T">;

export const tenRankTag = {
  identifier: "day0ff:tag-rank.T",
  rank: "T",
  name: "tag.rank.T.name",
  description: "tag.rank.T.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies TenRankTagDataType;
