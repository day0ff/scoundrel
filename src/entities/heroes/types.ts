import {TranslationKeysType} from "localization/types.ts";
import {HeroCardType} from "../cards/heroes/types.ts";
import {CollectionType, IdentifierType, RarityType, StatType} from "../types";
import type {EffectBindingType} from "entities/effects/types.ts";

import type {ClassicGameStateType, PlayingCardType, RoomZoneType, PotionsZoneType} from "store/features/classic-game/types.ts";

export type HeroZonesConfigType = {
    [Kind in keyof ClassicGameStateType["zones"]]: Pick<ClassicGameStateType["zones"][Kind], "capacity"> & (Kind extends "room" ? Pick<RoomZoneType, "minimumCardsToPlay"> : Kind extends "potions" ? Pick<PotionsZoneType, "maximumPotionsPerRoom"> : object) & {
        defaultCards: PlayingCardType["identifier"][];
        fillFromDungeon: boolean;
    };
};

export type HeroZonesConfigOverridesType = {
    [Kind in keyof HeroZonesConfigType]?: Partial<HeroZonesConfigType[Kind]>;
};

type HeroTranslationKeysType<Type extends string> = Extract<TranslationKeysType, `hero.${Type}.${string}`>;

type HeroType<Identifier extends string, Type extends string> = {
    identifier: IdentifierType<Identifier, Type>;
    name: HeroTranslationKeysType<Type>;
    description: HeroTranslationKeysType<Type>;
    card: HeroCardType<string>;
    rarity: RarityType;
    health: StatType;
    zones: HeroZonesConfigType;
    effects?: EffectBindingType[];
}

export type HeroDataType<Type extends string> = HeroType<"hero", Type> & CollectionType;

export type InitHeroDataType<Type extends string> = HeroDataType<Type>;
