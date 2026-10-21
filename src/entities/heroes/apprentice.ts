import { HERO_CARDS_MAP } from "../cards/heroes/constants.ts";
import { RarityTypes } from "../constants.ts";
import { configureHeroZones } from "./helpers.ts";
import { HeroDataType } from "./types.ts";

type ApprenticeHeroDataType = HeroDataType<"apprentice">;

export const apprenticeHero = {
  isLocked: false,
  isNotFound: false,
  identifier: "day0ff:hero-apprentice",
  name: "hero.apprentice.name",
  description: "hero.apprentice.description",
  card: HERO_CARDS_MAP["day0ff:card-hero.apprentice"],
  rarity: RarityTypes.COMMON,
  zones: configureHeroZones({
    weapons: { capacity: 3 },
    potions: { capacity: 2 },
  }),
  health: { min: 0, max: 20, current: 10 },
} satisfies ApprenticeHeroDataType;
