import {CardDataType} from "entities/cards/types.ts";
import {SpringValue} from "@react-spring/web";
import {CornerSizeType} from "styles";
import {CardTiltChildProps} from "components/CardTilt/types.ts";
import {ReactElement} from "react";

export type CardPropsType = CardDataType<string, string> & Partial<CardTiltChildProps> & {
    $size?: CornerSizeType;
    className?: string;
    rotateY?: SpringValue<number>;
    labels?: ReactElement | Array<ReactElement>;
    button?: ReactElement;
    tooltip?: ReactElement;
    mark?: ReactElement;
};