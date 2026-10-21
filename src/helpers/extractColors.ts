import {RgbaColorType} from "./getRgbaColor.ts";

export const  extractColors = async (src: string): Promise<Array<RgbaColorType>> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = "anonymous";

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return reject("No canvas context");

            ctx.drawImage(img, 0, 0);
            const { data, height } = ctx.getImageData(0, 0, 1, img.height);

            const rgbaArray: Array<RgbaColorType> = [];

            for (let y = 0; y < height; y++) {
                const i = y * 4;
                rgbaArray.push([
                    data[i],
                    data[i + 1],
                    data[i + 2],
                    +(data[i + 3] / 255).toFixed(3)
                ]);
            }

            resolve(rgbaArray);
        };

        img.onerror = reject;
    });
}
