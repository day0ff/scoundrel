import type {TranslationKeysType} from "localization/types.ts";

export const MAX_VISIBLE_ITEMS = 10;

export const COLLECTION_TITLE_TRANSLATIONS = {
    blueprints: "modal.collection.blueprints.title",
    heroes: "modal.collection.heroes.title",
} as const satisfies Record<string, TranslationKeysType>;
