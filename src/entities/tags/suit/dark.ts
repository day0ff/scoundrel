import {BASE_URL} from "constants.ts";
import {SuitTagType} from "./types.ts";

const suitImagePath = `${BASE_URL}/images/decks/dark-lord/suit.png`;

type DarkSuitTagDataType = SuitTagType<"dark">;

export const darkSuitTag = {
    identifier: "day0ff:tag-suit.dark",
    type: "dark",
    name: 'tag.suit.dark.name',
    description: 'tag.suit.dark.description',
    src: suitImagePath,
    style: {
        fontWeight: 'bold',
        color: '#333'
    },
} as const satisfies DarkSuitTagDataType;