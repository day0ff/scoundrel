import {BASE_URL} from "constants.ts";
import {SuitTagType} from "./types.ts";

const suitImagePath = `${BASE_URL}/images/decks/heal-potions/suit.png`;

type HealSuitTagDataType = SuitTagType<"heal">;

export const healSuitTag = {
    identifier: "day0ff:tag-suit.heal",
    type: "heal",
    name: 'tag.suit.heal.name',
    description: 'tag.suit.heal.description',
    src: suitImagePath,
    style: {
        fontWeight: 'bold',
        color: 'red'
    },
} as const satisfies HealSuitTagDataType;