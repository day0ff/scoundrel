import {RankType} from "entities/types.ts";
import {TippyProps} from "components/Tooltip/types.ts";

export type RankPropsType = Pick<TippyProps, "appendTo"> & {
    isRoot?: boolean;
    className?: string;
    children?: RankType | Array<RankType | undefined>;
};
