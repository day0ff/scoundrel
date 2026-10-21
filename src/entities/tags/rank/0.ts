import { RankTagType } from "./types.ts";

type ZeroRankTagDataType = RankTagType<"0">;

export const zeroRankTag = {
  identifier: "day0ff:tag-rank.0",
  rank: "0",
  name: "tag.rank.0.name",
  description: "tag.rank.0.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies ZeroRankTagDataType;
