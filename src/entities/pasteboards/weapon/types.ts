import {RankType} from "../../types.ts";
import {PasteboardDataType} from "../types.ts";

export type WeaponPasteboardDataType<RankTypeType extends RankType> = PasteboardDataType<'weapon', RankTypeType> & {
    role: "weapon";
    durability: number;
};
