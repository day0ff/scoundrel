import type {RankType} from "entities/types.ts";
import type {TippyProps} from "components/Tooltip/types.ts";

export type WeaponLastKillPropsType = Pick<TippyProps, "appendTo" | "disabled"> & {
    rank: RankType;
    strength?: number;
};
