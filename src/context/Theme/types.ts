import {useDevice} from "./useDevice.ts";
import {light, dark} from "./colorScheme";
import {media} from "./constants.ts";

export type DeviceType = ReturnType<typeof useDevice>;

export type FontSizeType = "huge" | "large" | "medium" | "small" | "tiny";

export type LineHeightType = "huge" | "large" | "medium" | "small" | "tiny";

type DarkColorType = keyof typeof dark["color"];
type LightColorType = keyof typeof light["color"];

export type ColorType = DarkColorType & LightColorType;

export type ColorSchemeType = "light" | "dark" | null | undefined;

export type ThemeType = {
    media: typeof media;
    colorScheme: ColorSchemeType;
    fontSize: Record<FontSizeType, string>;
    lineHeight: Record<LineHeightType, string>;
    color: Record<ColorType, string>;
    screen: {
        maxWidth: string;
    },
    device?: DeviceType;
}
