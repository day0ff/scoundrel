import type {TippyProps} from "components/Tooltip/types.ts";
import type {PlayingCardType, ZoneKindType} from "store/features/classic-game/types.ts";

export type GameCardPropsType = Pick<TippyProps, "appendTo"> & {
    dragging: boolean;
    isDropTarget: boolean;
    isReplacementTarget: boolean;
    showTarget: boolean;
    card: PlayingCardType;
    zone: ZoneKindType;
    onAttack: (cardId: string) => void;
};
