import {RarityTagType} from "./types.ts";

type LegendaryRarityTagDataType = RarityTagType<"legendary">;

export const legendaryRarityTag = {
    identifier: "day0ff:tag-rarity.legendary",
    name: 'tag.rarity.legendary.name',
    description: 'tag.rarity.legendary.description',
    style: {
        fontWeight: "bold",
        color: 'goldenrod',
    },
} satisfies LegendaryRarityTagDataType;