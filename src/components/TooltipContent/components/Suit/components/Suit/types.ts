import {SuitTagType} from "entities/tags/suit/types.ts";
import {TippyProps} from "components/Tooltip/types.ts";

export type SuitIconNamesType = SuitTagType<string>["type"];

export type SuitPropsType = Pick<TippyProps, "appendTo"> & {
    isRoot?: boolean;
    className?: string;
    children?: string | Array<string | undefined>;
};
