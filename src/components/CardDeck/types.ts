import type {PlayingCardType} from "entities/game/types.ts";

export type CardDeckPropsType = {
    card?: PlayingCardType;
    count: number;
    faceDown?: boolean;
    label: string;
};
