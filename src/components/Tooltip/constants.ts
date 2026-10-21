import type {TippyProps} from "./types.ts";

export const VIEWPORT_TOOLTIP_POPPER_OPTIONS: NonNullable<TippyProps["popperOptions"]> = {
    modifiers: [
        {name: "flip", options: {boundary: [], rootBoundary: "viewport", padding: 16}},
        {name: "preventOverflow", options: {boundary: [], rootBoundary: "viewport", padding: 16, altAxis: true}},
    ],
};
