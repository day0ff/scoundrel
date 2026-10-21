import { RankTagType } from "./types.ts";

type EightRankTagDataType = RankTagType<"8">;

export const eightRankTag = {
  identifier: "day0ff:tag-rank.8",
  rank: "8",
  name: "tag.rank.8.name",
  description: "tag.rank.8.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies EightRankTagDataType;
