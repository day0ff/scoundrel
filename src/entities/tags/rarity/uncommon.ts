import {RarityTagType} from "./types.ts";

type UncommonRarityTagDataType = RarityTagType<"uncommon">;

export const uncommonRarityTag = {
    identifier: "day0ff:tag-rarity.uncommon",
    name: 'tag.rarity.uncommon.name',
    description: 'tag.rarity.uncommon.description',
    style: {
        fontWeight: "bold",
        color: 'green',
    },
} satisfies UncommonRarityTagDataType;