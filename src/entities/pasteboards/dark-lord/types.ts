import {RankType} from "../../types.ts";
import {PasteboardDataType} from "../types.ts";

export type DarkLordPasteboardDataType<RankTypeType extends RankType> = PasteboardDataType<'dark', RankTypeType>;
