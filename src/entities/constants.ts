import type {RankType} from "./types.ts";

// Special ranks F, E, and B have no combat strength.
export const RANK_STRENGTH_MAP: Readonly<Partial<Record<RankType, number>>> = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
};

export const RarityTypes = {
    COMMON: 60,
    UNCOMMON: 27,
    RARE: 9,
    EPIC: 3,
    LEGENDARY: 1,
    IMPOSSIBLE: 0
} as const;

export const EntityTypes = {
    DICE: "dice",
} as const;

export const HandTypes = {
    NONE: "none",
    HIGH: "high",
    PAIR: "pair",
    TWO_PAIR: "twoPair",
    SET: "set",
    QUADS: "quads",
    FULL_HOUSE: "fullHouse",
    SMALL_STRAIGHT: "smallStraight",
    STRAIGHT: "straight",
    POKER: "poker"
} as const;

export const TimeTypes = {
    MORNING: 'morning',
    AFTERNOON: 'afternoon',
    EVENING: 'evening',
    NIGHT: 'night',
    NONE: 'none',
} as const;

export const FloorPaths = {
    ENTRANCE: "day0ff:room-entrance",
    EXIT: "day0ff:room-stairs",
    PATH: "day0ff:room-path",
} as const;