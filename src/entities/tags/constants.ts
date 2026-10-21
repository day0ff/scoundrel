import {RARITY_TAGS_MAP} from "./rarity/constants.ts";
import {TagDataType} from "./types.ts";
import {FORMATTERS_TAGS_MAP} from "./formatters/constants.ts";
import {SUIT_TAGS_MAP} from "./suit/constants.ts";
import {RANK_TAGS_MAP} from "./rank/constants.ts";

export const TAGS_MAP: Record<TagDataType<string, string>["identifier"], TagDataType<string, string>> = {
    ...RARITY_TAGS_MAP,
    ...FORMATTERS_TAGS_MAP,
    ...SUIT_TAGS_MAP,
    ...RANK_TAGS_MAP,
} as const;
