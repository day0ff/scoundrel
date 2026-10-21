import type {TranslationKeysType} from "localization/types.ts";

const MUSIC_LABELS = {
    on: "ui.game.menu.music.on",
    off: "ui.game.menu.music.off",
} as const satisfies Record<"on" | "off", TranslationKeysType>;

const FULLSCREEN_LABELS = {
    on: "ui.game.menu.fullscreen.on",
    off: "ui.game.menu.fullscreen.off",
} as const satisfies Record<"on" | "off", TranslationKeysType>;

export const getMusicLabel = (enabled: boolean) => MUSIC_LABELS[enabled ? "on" : "off"];
export const getFullscreenLabel = (enabled: boolean) => FULLSCREEN_LABELS[enabled ? "on" : "off"];
