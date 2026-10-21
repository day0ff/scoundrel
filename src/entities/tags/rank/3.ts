import { RankTagType } from "./types.ts";

type ThreeRankTagDataType = RankTagType<"3">;

export const threeRankTag = {
  identifier: "day0ff:tag-rank.3",
  rank: "3",
  name: "tag.rank.3.name",
  description: "tag.rank.3.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies ThreeRankTagDataType;
