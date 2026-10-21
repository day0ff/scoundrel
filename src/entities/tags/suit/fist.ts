import {BASE_URL} from "constants.ts";
import type {SuitTagType} from "./types.ts";

const suitImagePath = `${BASE_URL}/images/decks/fist/suit.png`;

type FistSuitTagDataType = SuitTagType<"fist">;

export const fistSuitTag = {
    identifier: "day0ff:tag-suit.fist",
    type: "fist",
    name: "tag.suit.fist.name",
    description: "tag.suit.fist.description",
    src: suitImagePath,
    style: {
        fontWeight: "bold",
        color: "sienna",
    },
} as const satisfies FistSuitTagDataType;
