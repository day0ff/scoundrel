import {ComponentProps} from "react";
import {CornerSizeType} from "styles";

export type CardButtonPropsType = ComponentProps<"button"> & {
    $size?: CornerSizeType
    className?: string;
};