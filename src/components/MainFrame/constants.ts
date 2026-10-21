import type {FrameConfig} from "components/Frame";
import type {MainFrameVariant} from "./types.ts";

export const MAIN_FRAME_MAP = {
    outer: {
        spriteUrl: `${import.meta.env.BASE_URL}images/interface/main-frame/outer.png`,
        config: {width: 1076, height: 247, cornerWidth: 32, cornerHeight: 32, borderWidth: 24, borderHeight: 24},
    },
    inner: {
        spriteUrl: `${import.meta.env.BASE_URL}images/interface/main-frame/inner.png`,
        config: {width: 366, height: 268, cornerWidth: 26, cornerHeight: 22, borderWidth: 8, borderHeight: 8},
    },
    title: {
        spriteUrl: `${import.meta.env.BASE_URL}images/interface/main-frame/title.png`,
        config: {width: 265, height: 49, cornerWidth: 30, cornerHeight: 22, borderWidth: 8, borderHeight: 8},
    },
} as const satisfies Record<MainFrameVariant, {spriteUrl: string; config: FrameConfig}>;
