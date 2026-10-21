import { RankTagType } from "./types.ts";

type AceRankTagDataType = RankTagType<"A">;

export const aceRankTag = {
  identifier: "day0ff:tag-rank.A",
  rank: "A",
  name: "tag.rank.A.name",
  description: "tag.rank.A.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies AceRankTagDataType;
