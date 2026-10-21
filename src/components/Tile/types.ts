import type {HTMLAttributes} from "react";

export type TileVariant = "tile" | "stone";

export type TilePropsType = HTMLAttributes<HTMLDivElement> & {
    variant?: TileVariant;
    /** Background inset only. Numbers are pixels; strings accept CSS inset values. */
    indent?: number | string;
    /** Clips only the background. Numbers are pixels; strings accept CSS border-radius values. */
    cornerRadius?: number | string;
};
