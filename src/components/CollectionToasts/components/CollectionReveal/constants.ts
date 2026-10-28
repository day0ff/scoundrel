import type {TranslationKeysType} from "localization/types.ts";
import type {CollectionToastType} from "store/features/collection-toasts/types.ts";

export const TOAST_FADE_IN_DURATION_MS = 1200;
export const REVEAL_DELAY_MS = TOAST_FADE_IN_DURATION_MS + 300;
export const REVEAL_DURATION_MS = 1000;
export const TOAST_DURATION_MS = 6500;
export const TOAST_FADE_DURATION_MS = 450;
export const COLLECTION_TOAST_TITLES = {
    unlocked: "toast.collection.unlocked",
    discovered: "toast.collection.discovered",
} as const satisfies Record<CollectionToastType["kind"], TranslationKeysType>;
