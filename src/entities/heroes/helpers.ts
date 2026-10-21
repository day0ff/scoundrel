import {DEFAULT_HERO_ZONES} from "./defaults.ts";
import type {HeroZonesConfigOverridesType, HeroZonesConfigType} from "./types.ts";

export const configureHeroZones = (overrides: HeroZonesConfigOverridesType = {}): HeroZonesConfigType =>
    Object.fromEntries((Object.keys(DEFAULT_HERO_ZONES) as Array<keyof HeroZonesConfigType>).map(kind => {
        const defaults = DEFAULT_HERO_ZONES[kind];
        const override = overrides[kind];
        return [kind, {
            ...(kind === "room" ? {minimumCardsToPlay: overrides.room?.minimumCardsToPlay ?? DEFAULT_HERO_ZONES.room.minimumCardsToPlay} : {}),
            ...(kind === "potions" ? {maximumPotionsPerRoom: overrides.potions?.maximumPotionsPerRoom ?? DEFAULT_HERO_ZONES.potions.maximumPotionsPerRoom} : {}),
            capacity: override?.capacity ?? defaults.capacity,
            defaultCards: [...(override?.defaultCards ?? defaults.defaultCards)],
            fillFromDungeon: override?.fillFromDungeon ?? defaults.fillFromDungeon,
        }];
    })) as HeroZonesConfigType;
