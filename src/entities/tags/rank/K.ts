import { RankTagType } from "./types.ts";

type KingRankTagDataType = RankTagType<"K">;

export const kingRankTag = {
  identifier: "day0ff:tag-rank.K",
  rank: "K",
  name: "tag.rank.K.name",
  description: "tag.rank.K.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies KingRankTagDataType;
