export type RgbaColorType = [r: number, g: number, b: number, a: number];

export const getRgbaColor = (color: string): RgbaColorType => {
    const ctx = document.createElement('canvas').getContext('2d');

    if (!ctx) return [255, 255, 255, 1];

    ctx.fillStyle = color;

    const computed = ctx.fillStyle;

    if (computed.startsWith('rgb')) {
        const match = computed.match(/[\d.]+/g)?.map(Number);
        if (match) {
            const [r, g, b, a = 1] = match;
            return [r, g, b, a];
        }
    }

    if (computed.startsWith('#')) {
        let r = 255, g = 255, b = 255;
        if (computed.length === 7) { // #rrggbb
            r = parseInt(computed.slice(1, 3), 16);
            g = parseInt(computed.slice(3, 5), 16);
            b = parseInt(computed.slice(5, 7), 16);
        } else if (computed.length === 4) { // #rgb
            r = parseInt(computed[1] + computed[1], 16);
            g = parseInt(computed[2] + computed[2], 16);
            b = parseInt(computed[3] + computed[3], 16);
        }
        return [r, g, b, 1];
    }

    return [255, 255, 255, 1];
}