import type {PlayingCardType} from "entities/game/types.ts";

export type HealFeedbackPropsType = {
    duration: number;
    potion?: PlayingCardType;
};
