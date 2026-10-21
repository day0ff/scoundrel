import {RarityTagType} from "./types.ts";

type RareRarityTagDataType = RarityTagType<"rare">;

export const rareRarityTag = {
    identifier: "day0ff:tag-rarity.rare",
    name: 'tag.rarity.rare.name',
    description: 'tag.rarity.rare.description',
    style: {
        fontWeight: "bold",
        color: 'red',
    },
} satisfies RareRarityTagDataType;