import type {FramePropsType} from "components/Frame";
import type {TilePropsType} from "components/Tile";

export type MainFrameVariant = "outer" | "inner" | "title";

export type MainFramePropsType = Omit<FramePropsType, "spriteUrl" | "config"> & Omit<TilePropsType, "variant"> & {
    variant?: MainFrameVariant;
    tileVariant?: TilePropsType["variant"];
    isOver?: boolean;
};
