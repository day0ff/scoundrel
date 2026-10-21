import {RarityTagType} from "./types.ts";
import {commonRarityTag} from "./common.ts";
import {uncommonRarityTag} from "./uncommon.ts";
import {rareRarityTag} from "./rare.ts";
import {epicRarityTag} from "./epic.ts";
import {legendaryRarityTag} from "./legendary.ts";

export const RARITY_TAGS_MAP: Record<RarityTagType<string>["identifier"], RarityTagType<string>> = {
    "day0ff:tag-rarity.common": commonRarityTag,
    "day0ff:tag-rarity.uncommon": uncommonRarityTag,
    "day0ff:tag-rarity.rare": rareRarityTag,
    "day0ff:tag-rarity.epic": epicRarityTag,
    "day0ff:tag-rarity.legendary": legendaryRarityTag,
} as const;
