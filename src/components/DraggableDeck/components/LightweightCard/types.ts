import {CardDataType} from "entities/cards/types.ts";
import {SpringValue} from "@react-spring/web";
import {CornerSizeType} from "styles";
import {CardTiltChildProps} from "components/CardTilt/types.ts";
import {ReactElement} from "react";

export type LightweightCardPropsType = Pick<CardDataType<string, string>, "face" | "back"> & Partial<CardTiltChildProps> & {
    $size?: CornerSizeType;
    className?: string;
    rotateY?: SpringValue<number>;
    index?: number;
};
