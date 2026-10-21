import type {HTMLAttributes} from "react";

export type FrameRegion = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type FramePiece = "topLeft" | "top" | "topRight" | "left" | "right" | "bottomLeft" | "bottom" | "bottomRight";

// All dimensions are native image pixels. Corners stay fixed; edges tile.
export type FrameConfig = {
    width: number;
    height: number;
    cornerWidth: number;
    cornerHeight: number;
    borderWidth: number;
    borderHeight: number;
};

export type FramePropsType = HTMLAttributes<HTMLDivElement> & {
    spriteUrl: string;
    config: FrameConfig;
};
