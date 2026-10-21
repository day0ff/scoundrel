import { RankTagType } from "./types.ts";

type FourRankTagDataType = RankTagType<"4">;

export const fourRankTag = {
  identifier: "day0ff:tag-rank.4",
  rank: "4",
  name: "tag.rank.4.name",
  description: "tag.rank.4.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies FourRankTagDataType;
