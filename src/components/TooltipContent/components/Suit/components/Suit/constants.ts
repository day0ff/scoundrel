import {SUIT_TAGS_MAP} from "entities/tags/suit/constants.ts";
import {SuitTagType} from "entities/tags/suit/types.ts";
import {SuitIconNamesType} from "./types.ts";

export const getSuitTagProps = (name: SuitIconNamesType): SuitTagType<string> | undefined => {
    const identifier = `day0ff:tag-suit.${name}` as SuitTagType<string>["identifier"];

    return SUIT_TAGS_MAP[identifier];
}
