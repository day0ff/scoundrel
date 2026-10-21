import { RankTagType } from "./types.ts";

type NineRankTagDataType = RankTagType<"9">;

export const nineRankTag = {
  identifier: "day0ff:tag-rank.9",
  rank: "9",
  name: "tag.rank.9.name",
  description: "tag.rank.9.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies NineRankTagDataType;
