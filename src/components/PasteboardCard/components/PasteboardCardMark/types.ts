import {RankType} from "entities/types.ts";

export type PasteboardCardMarkPropsType = {
    className?: string;
    suit: string;
    rank: RankType;
    color?: string;
};