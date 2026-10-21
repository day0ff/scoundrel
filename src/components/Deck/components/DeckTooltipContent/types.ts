import type {DeckPropsType} from "../../types.ts";

export type DeckTooltipContentPropsType = Pick<DeckPropsType, "name" | "description"> & {
    className?: string;
};
