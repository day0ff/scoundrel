import type {RankType} from "../../types.ts";
import type {PasteboardDataType} from "../types.ts";

export type FistPasteboardDataType<RankTypeType extends RankType> = PasteboardDataType<'fist', RankTypeType>;
