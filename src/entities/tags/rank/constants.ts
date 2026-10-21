import { RankType } from "../../types.ts";
import { RankTagType } from "./types.ts";
import { zeroRankTag } from "./0.ts";
import { oneRankTag } from "./1.ts";
import { twoRankTag } from "./2.ts";
import { threeRankTag } from "./3.ts";
import { fourRankTag } from "./4.ts";
import { fiveRankTag } from "./5.ts";
import { sixRankTag } from "./6.ts";
import { sevenRankTag } from "./7.ts";
import { eightRankTag } from "./8.ts";
import { nineRankTag } from "./9.ts";
import { tenRankTag } from "./T.ts";
import { jackRankTag } from "./J.ts";
import { queenRankTag } from "./Q.ts";
import { kingRankTag } from "./K.ts";
import { aceRankTag } from "./A.ts";
import { foolRankTag } from "./F.ts";
import { eitherRankTag } from "./E.ts";
import { billetRankTag } from "./B.ts";

export const RANK_TAGS_MAP: Record<
  RankTagType<RankType>["identifier"],
  RankTagType<RankType>
> = {
  "day0ff:tag-rank.0": zeroRankTag,
  "day0ff:tag-rank.1": oneRankTag,
  "day0ff:tag-rank.2": twoRankTag,
  "day0ff:tag-rank.3": threeRankTag,
  "day0ff:tag-rank.4": fourRankTag,
  "day0ff:tag-rank.5": fiveRankTag,
  "day0ff:tag-rank.6": sixRankTag,
  "day0ff:tag-rank.7": sevenRankTag,
  "day0ff:tag-rank.8": eightRankTag,
  "day0ff:tag-rank.9": nineRankTag,
  "day0ff:tag-rank.T": tenRankTag,
  "day0ff:tag-rank.J": jackRankTag,
  "day0ff:tag-rank.Q": queenRankTag,
  "day0ff:tag-rank.K": kingRankTag,
  "day0ff:tag-rank.A": aceRankTag,
  "day0ff:tag-rank.F": foolRankTag,
  "day0ff:tag-rank.E": eitherRankTag,
  "day0ff:tag-rank.B": billetRankTag,
} as const;
