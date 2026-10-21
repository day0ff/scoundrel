import {ComponentProps} from "react";

export type MenuButtonPropsType = ComponentProps<"input"> & {
    className?: string;
    showBullet?: boolean;
    to?: string
};