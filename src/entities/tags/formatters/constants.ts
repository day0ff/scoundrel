import {FormatterTagType} from "./types.ts";
import {scoreFormatterTag} from "./score.ts";

export const FORMATTERS_TAGS_MAP: Record<FormatterTagType<string>["identifier"], FormatterTagType<string>> = {
    "day0ff:tag-formatter.score": scoreFormatterTag,
} as const;
