import { RankTagType } from "./types.ts";

type QueenRankTagDataType = RankTagType<"Q">;

export const queenRankTag = {
  identifier: "day0ff:tag-rank.Q",
  rank: "Q",
  name: "tag.rank.Q.name",
  description: "tag.rank.Q.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies QueenRankTagDataType;
