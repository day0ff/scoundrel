import {RarityTagType} from "./types.ts";

type CommonRarityTagDataType = RarityTagType<"common">;

export const commonRarityTag = {
    identifier: "day0ff:tag-rarity.common",
    name: 'tag.rarity.common.name',
    description: 'tag.rarity.common.description',
    style: {
        fontWeight: "bold",
        color: 'blue',
    },
} satisfies CommonRarityTagDataType;