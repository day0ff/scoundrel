import {InitUsageDataType} from "entities/usage/types.ts";
import {TippyProps} from "components/Tooltip/types.ts";

export type UsageLabelPropsType = InitUsageDataType<string> & Pick<TippyProps, "appendTo"> & {
};