import {skeletonPackCard} from "./skeleton.ts";
import type {PackCardType} from "./types.ts";
import {classicPackCard} from "./classic.ts";
import {necromancerPackCard} from "./necromancer.ts";

export const PACKS_CARDS_MAP: Record<PackCardType<string>["identifier"], PackCardType<string>> = {
    [skeletonPackCard.identifier]: skeletonPackCard,
    [classicPackCard.identifier]: classicPackCard,
    [necromancerPackCard.identifier]: necromancerPackCard,
} as const;
