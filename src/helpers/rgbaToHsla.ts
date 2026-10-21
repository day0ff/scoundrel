export type HslaColorType = [r: number, g: number, b: number, a: number];

export const rgbaToHsla = (r: number, g: number, b: number, A = 1): HslaColorType => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    const H = Math.round(h * 360);
    const S = Math.round(s * 100);
    const L = Math.round(l * 100);

    return [H, S, L, A];
}
