import {CornerSizeType} from "styles";
import {CardDataType} from "entities/cards/types.ts";
import {CollectionType} from "entities/types.ts";
import {DraggableCardType} from "components/DraggableCards/types.ts";
import {CardTiltProps} from "../CardTilt/types.ts";
import {ReactElement} from "react";

export type DraggableCardPropsType = Omit<CollectionType, "conditions"> & CardTiltProps & DraggableCardType<{
    isSelectable?: boolean;
    isFlippable?: boolean;
    isFlipped?: boolean;
    color?: string;
    size?: CornerSizeType;
    className?: string;
    identifier: string;
    card: CardDataType<string, string>;
    labels?: ReactElement | Array<ReactElement>;
    button?: ReactElement;
    tooltip?: ReactElement;
    mark?: ReactElement;
}>;