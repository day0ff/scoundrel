import {RankType} from "entities/types.ts";
import {PasteboardDataType} from "entities/pasteboards/types.ts";
import {TippyProps} from "components/Tooltip/types.ts";
import {DraggableCardPropsType} from "components/DraggableCard/types.ts";

export type PasteboardCardPropsType = Pick<TippyProps, "appendTo"> & DraggableCardPropsType & PasteboardDataType<string, RankType> & {
    className?: string;
    tooltipDisabled?: boolean;
};
