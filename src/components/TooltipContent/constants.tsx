import {ReactElement} from "react";
import {TAGS_MAP} from "entities/tags/constants.ts";
import Tag from "components/Tag";
import {FORMATTERS_TAG_COMPONENTS_MAP} from "./components/Formatters/constants.tsx";
import {FormattersTagEnumerationType} from "./components/Formatters/types.ts";
import {SUIT_TAG_COMPONENTS_MAP} from "./components/Suit/constatnts.tsx";
import {SuitTagEnumerationType} from "./components/Suit/types.ts";
import {RANK_TAG_COMPONENTS_MAP} from "./components/Rank/constatnts.tsx";
import {RankTagEnumerationType} from "./components/Rank/types.ts";

const getTags = () => Object.entries(TAGS_MAP).reduce((acc, [identifier, tagProps]) => ({
    ...acc,
    [identifier]: <Tag {...tagProps}/>,
    [`${identifier}-root`]: <Tag {...tagProps} isRoot={true}/>,
}), {});

export const TAG_COMPONENTS_MAP: Record<keyof typeof TAGS_MAP | FormattersTagEnumerationType | SuitTagEnumerationType | RankTagEnumerationType, ReactElement> = {
    ...getTags(),
    ...FORMATTERS_TAG_COMPONENTS_MAP,
    ...SUIT_TAG_COMPONENTS_MAP,
    ...RANK_TAG_COMPONENTS_MAP,
};