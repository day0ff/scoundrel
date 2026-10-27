import type {PackCardType} from "./types.ts";
import {classicPackCard} from "./classic.ts";

export const PACKS_CARDS_MAP: Record<PackCardType<string>["identifier"], PackCardType<string>> = {
    [classicPackCard.identifier]: classicPackCard,
} as const;
