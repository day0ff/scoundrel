import {SOUND_PATHS} from "assets/sounds";
import {BASE_URL} from "constants.ts";
import type {GameOutcomeType} from "entities/game/types.ts";
import type {TranslationKeysType} from "localization/types.ts";

export const GAME_RESULT_TRANSLATIONS = {
    victory: {
        title: "ui.gameResult.victory.title",
        description: "ui.gameResult.victory.description",
    },
    defeat: {
        title: "ui.gameResult.defeat.title",
        description: "ui.gameResult.defeat.description",
    },
} as const satisfies Record<GameOutcomeType, Record<"title" | "description", TranslationKeysType>>;

export const GAME_RESULT_SOUNDS = {
    victory: [SOUND_PATHS.Win1, SOUND_PATHS.Win2],
    defeat: [SOUND_PATHS.Defeat1, SOUND_PATHS.Defeat2],
} as const satisfies Record<GameOutcomeType, readonly string[]>;

export const GAME_RESULT_BACKGROUNDS = {
    victory: [`${BASE_URL}/images/interface/win-1.png`, `${BASE_URL}/images/interface/win-2.png`],
    defeat: [`${BASE_URL}/images/interface/defeat-1.png`, `${BASE_URL}/images/interface/defeat-2.png`],
} as const satisfies Record<GameOutcomeType, readonly string[]>;
