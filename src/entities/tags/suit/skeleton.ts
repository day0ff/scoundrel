import {BASE_URL} from "constants.ts";
import {SuitTagType} from "./types.ts";

const suitImagePath = `${BASE_URL}/images/decks/skeleton/suit.png`;

type SkeletonSuitTagDataType = SuitTagType<"skeleton">;

export const skeletonSuitTag = {
    identifier: "day0ff:tag-suit.skeleton",
    type: "skeleton",
    name: 'tag.suit.skeleton.name',
    description: 'tag.suit.skeleton.description',
    src: suitImagePath,
    style: {
        fontWeight: 'bold',
        color: 'gray'
    },
} as const satisfies SkeletonSuitTagDataType;