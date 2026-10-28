import {BASE_URL} from "constants.ts";
import {PACKS_CARDS_MAP} from "entities/cards/packs/constants.ts";
import {classicPack} from "./classic.ts";
import type {PackDataType} from "./types.ts";

export const necromancerPack = {
    identifier: "day0ff:pack-necromancer",
    name: "pack.necromancer.name",
    description: "pack.necromancer.description",
    card: PACKS_CARDS_MAP["day0ff:card-pack.necromancer"],
    castle: `${BASE_URL}/images/packs/necromancer/castle.png`,
    room: `${BASE_URL}/images/packs/necromancer/room.png`,
    dungeon: `${BASE_URL}/images/packs/necromancer/dungen.png`,
    discard: `${BASE_URL}/images/packs/necromancer/discard.png`,
    crypt: `${BASE_URL}/images/packs/necromancer/crypt.png`,
    isLocked: true,
    isNotFound: true,
    condition: {
        description: "pack.necromancer.unlock.description",
        unlock: {type: "gamesCompleted", count: 1},
        discover: {type: "gamesCompleted", count: 1},
    },
    decks: classicPack.decks,
} as const satisfies PackDataType<"necromancer">;
