import {HERO_CARDS_MAP} from "./heroes/constants.ts";
import {CardDataType, MixBlendMode} from "./types.ts";
import {DECKS_CARDS_MAP} from "./decks/constants.ts";

export const getMixBlendMode = (blendMode: MixBlendMode | undefined): MixBlendMode => blendMode ?? 'normal';

export const CARDS_MAP: Record<CardDataType<string, string>["identifier"], CardDataType<string, string>> = {
    ...HERO_CARDS_MAP,
    ...DECKS_CARDS_MAP
} as const;

