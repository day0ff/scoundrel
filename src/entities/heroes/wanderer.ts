import { HERO_CARDS_MAP } from "../cards/heroes/constants.ts";
import { RarityTypes } from "../constants.ts";
import { configureHeroZones } from "./helpers.ts";
import { HeroDataType } from "./types.ts";

type WandererHeroDataType = HeroDataType<"wanderer">;

export const wandererHero = {
  isLocked: false,
  isNotFound: false,
  identifier: "day0ff:hero-wanderer",
  name: "hero.wanderer.name",
  description: "hero.wanderer.description",
  card: HERO_CARDS_MAP["day0ff:card-hero.wanderer"],
  rarity: RarityTypes.COMMON,
  zones: configureHeroZones(),
  health: { min: 0, max: 20, current: 10 },
} satisfies WandererHeroDataType;
