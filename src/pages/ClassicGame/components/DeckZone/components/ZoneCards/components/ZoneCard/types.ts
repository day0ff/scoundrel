import type {PlayingCardType} from "entities/game/types.ts";

export type ZoneCardPropsType = PlayingCardType & {
    isSelected: boolean;
    onSelect: () => void;
};
