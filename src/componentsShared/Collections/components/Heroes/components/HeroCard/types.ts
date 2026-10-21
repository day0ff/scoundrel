import {HeroDataType} from "entities/heroes/types.ts";
import {TippyProps} from "components/Tooltip/types.ts";
import {DraggableCardPropsType} from "components/DraggableCard/types.ts";

export type HeroCardCardPropsType = Pick<TippyProps, "appendTo"> & DraggableCardPropsType & HeroDataType<string> & {
    className?: string;
};