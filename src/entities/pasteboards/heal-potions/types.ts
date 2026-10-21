import {RankType} from "../../types.ts";
import {PasteboardDataType} from "../types.ts";

export type HealPasteboardDataType<RankTypeType extends RankType> = PasteboardDataType<"heal", RankTypeType>;
