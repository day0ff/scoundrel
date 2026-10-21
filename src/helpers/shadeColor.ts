import {getRgbaColor} from "./getRgbaColor.ts";
import {rgbaToHsla} from "./rgbaToHsla.ts";

export const shadeColor = (color: string, percent: number) => {
    const [r, g, b, a] = getRgbaColor(color);

    const [H, S, L, A] = rgbaToHsla(r, g, b, a);

    const newL = Math.min(100, Math.max(0, L + percent))

    return `hsla(${H}, ${S}%, ${newL}%, ${A})`;
}
