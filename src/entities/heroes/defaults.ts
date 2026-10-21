import type {HeroZonesConfigType} from "./types.ts";

export const DEFAULT_HERO_ZONES: HeroZonesConfigType = {
    dungeon: {capacity: Infinity, defaultCards: [], fillFromDungeon: false},
    discard: {capacity: Infinity, defaultCards: [], fillFromDungeon: false},
    room: {minimumCardsToPlay: 3, capacity: 4, defaultCards: [], fillFromDungeon: true},
    weapons: {capacity: 2, defaultCards: ["day0ff:pasteboard-fist.0"], fillFromDungeon: true},
    potions: {maximumPotionsPerRoom: 1, capacity: 1, defaultCards: [], fillFromDungeon: true},
    crypt: {capacity: Infinity, defaultCards: [], fillFromDungeon: false},
};
