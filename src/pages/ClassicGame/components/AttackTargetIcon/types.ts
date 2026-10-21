import type {TippyProps} from "components/Tooltip/types.ts";
export type AttackTargetIconPropsType = Pick<TippyProps, "appendTo"> & {
    visible: boolean;
    hoverable?: boolean;
};
