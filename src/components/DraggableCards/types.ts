import {ComponentType} from "react";
import {TippyProps} from "components/Tooltip/types.ts";

export type DraggableCardType<T = Record<string, unknown>> = {
    isSelected: boolean,
    id: string;
} & T;

export type DraggableCardsPropsType<T> = Pick<TippyProps, "appendTo"> &{
    canLoseFocus?: boolean;
    items: Array<DraggableCardType<T>>;
    CardItem: ComponentType<DraggableCardType<T>>;
    onSelect?: (item: DraggableCardType<T> | undefined) => void;
}