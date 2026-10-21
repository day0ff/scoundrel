import { RankTagType } from "./types.ts";

type JackRankTagDataType = RankTagType<"J">;

export const jackRankTag = {
  identifier: "day0ff:tag-rank.J",
  rank: "J",
  name: "tag.rank.J.name",
  description: "tag.rank.J.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies JackRankTagDataType;
