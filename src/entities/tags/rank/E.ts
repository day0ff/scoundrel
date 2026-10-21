import { RankTagType } from "./types.ts";

type EitherRankTagDataType = RankTagType<"E">;

export const eitherRankTag = {
  identifier: "day0ff:tag-rank.E",
  rank: "E",
  name: "tag.rank.E.name",
  description: "tag.rank.E.description",
  style: {
    fontWeight: "bold",
  },
} as const satisfies EitherRankTagDataType;
