import {RankType} from "../../../types.ts";
import {PasteboardCardType} from "../types.ts";

export type WeaponCardType<RankTypeType extends RankType> = PasteboardCardType<'weapon', RankTypeType>;
