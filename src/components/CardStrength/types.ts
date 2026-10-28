import type {TippyProps} from "components/Tooltip/types.ts";
import type {RankType} from "entities/types.ts";

export type CardStrengthPropsType = Pick<TippyProps, "appendTo" | "disabled"> & {
    rank: RankType;
    strength?: number;
};
