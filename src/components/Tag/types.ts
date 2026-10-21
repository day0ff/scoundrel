import {TAGS_MAP} from "entities/tags/constants.ts";

export type TagPropsType = typeof TAGS_MAP[keyof typeof TAGS_MAP] & {
    isRoot?: boolean;
};