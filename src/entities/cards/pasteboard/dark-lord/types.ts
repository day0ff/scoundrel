import {RankType} from "../../../types.ts";
import {PasteboardCardType} from "../types.ts";

export type DarkLordCardType<RankTypeType extends RankType> = PasteboardCardType<'dark', RankTypeType>;
