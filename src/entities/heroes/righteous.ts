import {HERO_CARDS_MAP} from "../cards/heroes/constants.ts";
import {RarityTypes} from "../constants.ts";
import {configureHeroZones} from "./helpers.ts";
import {HeroDataType} from "./types.ts";

type RighteousHeroDataType = HeroDataType<"righteous">;

export const righteousHero = {
    isLocked: false,
    isNotFound: false,
    identifier: "day0ff:hero-righteous",
    name: 'hero.righteous.name',
    description: 'hero.righteous.description',
    card: HERO_CARDS_MAP['day0ff:card-hero.righteous'],
    rarity: RarityTypes.UNCOMMON,
    zones: configureHeroZones(),
    health: {min: 0, max: 20, current: 10},
} satisfies RighteousHeroDataType;
