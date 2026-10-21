import {apprenticeHero} from "./apprentice.ts";
import {righteousHero} from "./righteous.ts";
import {wandererHero} from "./wanderer.ts";
import {HeroDataType, InitHeroDataType} from "./types.ts";

export const HEROES_MAP: Record<HeroDataType<string>["identifier"], HeroDataType<string>> = {
    "day0ff:hero-wanderer": wandererHero,
    "day0ff:hero-apprentice": apprenticeHero,
    "day0ff:hero-righteous": righteousHero,
} as const;

export const initHero = (identifier: keyof typeof HEROES_MAP): InitHeroDataType<string> => {
    const hero = HEROES_MAP[identifier];

    return ({
        ...hero,
        health: {...hero.health},
        zones: Object.fromEntries(Object.entries(hero.zones).map(([kind, zone]) => [
            kind, {...zone, defaultCards: [...zone.defaultCards]},
        ])) as HeroDataType<string>["zones"],
        ...(hero.effects ? {effects: hero.effects.map(effect => ({...effect}))} : {}),
    })
}

export const initHeroes = Object.keys(HEROES_MAP).map(identifier => initHero(identifier as keyof typeof HEROES_MAP));
