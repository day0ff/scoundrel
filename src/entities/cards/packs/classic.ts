import {BASE_URL} from "constants.ts";
import type {PackCardType} from "./types.ts";

export const classicPackCard = {
    identifier: "day0ff:card-pack.classic",
    type: "pack",
    name: "card.pack.classic.name",
    color: "chocolate",
    face: {
        base: `${BASE_URL}/images/packs/classic/face.png`,
    },
    back: {
        base: `${BASE_URL}/images/packs/classic/back.png`,
    },
} satisfies PackCardType<"classic">;
