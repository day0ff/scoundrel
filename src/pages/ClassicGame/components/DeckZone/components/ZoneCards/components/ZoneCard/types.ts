import type {PlayingCardType} from "store/features/classic-game/types.ts";

export type ZoneCardPropsType = PlayingCardType & {
    isSelected: boolean;
    onSelect: () => void;
};
