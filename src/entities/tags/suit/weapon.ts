import {BASE_URL} from "constants.ts";
import {SuitTagType} from "./types.ts";

const suitImagePath = `${BASE_URL}/images/decks/weapon/suit.png`;

type WeaponSuitTagDataType = SuitTagType<"weapon">;

export const weaponSuitTag = {
    identifier: "day0ff:tag-suit.weapon",
    type: "weapon",
    name: 'tag.suit.weapon.name',
    description: 'tag.suit.weapon.description',
    src: suitImagePath,
    style: {
        fontWeight: 'bold',
        color: "blue",
    },
} as const satisfies WeaponSuitTagDataType;