import type {PlayingCardType} from "store/features/classic-game/types.ts";

export type CardDeckPropsType = {
    card?: PlayingCardType;
    count: number;
    faceDown?: boolean;
    label: string;
};
