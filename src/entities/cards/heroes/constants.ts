import {HeroCardType} from "./types.ts";
import {billetHeroCard} from "./billet.ts";
import {apprenticeCard} from "./apprentice.ts";
import {righteousCard} from "./righteous.ts";
import {wandererCard} from "./wanderer.ts";

export const HERO_CARDS_MAP: Record<HeroCardType<string>["identifier"], HeroCardType<string>> = {
    "day0ff:card-hero.billet": billetHeroCard,
    "day0ff:card-hero.wanderer": wandererCard,
    "day0ff:card-hero.apprentice": apprenticeCard,
    "day0ff:card-hero.righteous": righteousCard,
} as const;
