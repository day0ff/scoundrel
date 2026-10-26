import type {TippyProps} from "components/Tooltip/types.ts";
import type {PlayingCardType} from "entities/game/types.ts";

export type CardDragPreviewPropsType = Pick<TippyProps, "appendTo"> & {
    card: PlayingCardType;
};
