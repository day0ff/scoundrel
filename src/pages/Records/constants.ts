import type {TranslationKeysType} from "localization/types.ts";
import type {RecordGameType} from "store/features/records/types.ts";

export const GAME_TYPE_LABELS = {
    "classic-game": "page.records.classic-game",
} as const satisfies Record<RecordGameType, TranslationKeysType>;
