import type {RecordGameType} from "store/features/records/types.ts";
import type {TranslationKeysType} from "localization/types.ts";

export const GAME_TYPE_LABELS = {
    classic: "page.records.classic-game",
} as const satisfies Record<RecordGameType, TranslationKeysType>;
