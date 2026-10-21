import { RankTagType } from "./types.ts";

type SixRankTagDataType = RankTagType<"6">;

export const sixRankTag = {
  identifier: "day0ff:tag-rank.6",
  rank: "6",
  name: "tag.rank.6.name",
  description: "tag.rank.6.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies SixRankTagDataType;
