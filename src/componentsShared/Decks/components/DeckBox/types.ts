import {Placement} from "tippy.js";
import {DeckDataType} from "entities/decks/types.ts";
import {DraggableCardType} from "components/DraggableCards/types.ts";
import {TippyProps} from "components/Tooltip/types.ts";
import {ReactElement} from "react";
import {ModalStackControls} from "../../../ModalStack/types.ts";

export type DeckBoxPropsType = Pick<TippyProps, "appendTo"> & DraggableCardType<DeckDataType<string>> & {
    className?: string;
    placement?: Placement;
    trigger?: string;
    onPush?: (newElement: ReactElement<ModalStackControls>) => void;
};