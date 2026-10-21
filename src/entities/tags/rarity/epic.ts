import {RarityTagType} from "./types.ts";

type EpicRarityTagDataType = RarityTagType<"epic">;

export const epicRarityTag = {
    identifier: "day0ff:tag-rarity.epic",
    name: 'tag.rarity.epic.name',
    description: 'tag.rarity.epic.description',
    style: {
        fontWeight: "bold",
        color: 'purple',
    },
} satisfies EpicRarityTagDataType;