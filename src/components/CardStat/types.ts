import type {TippyProps} from "components/Tooltip/types.ts";

export type CardStatPropsType = Pick<TippyProps, "appendTo" | "disabled"> & {
    value: string | number;
    label: string;
    description: string;
};
