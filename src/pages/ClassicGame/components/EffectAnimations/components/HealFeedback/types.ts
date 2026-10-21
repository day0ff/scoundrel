import type {PlayingCardType} from "store/features/classic-game/types.ts";

export type HealFeedbackPropsType = {
    duration: number;
    potion?: PlayingCardType;
};
