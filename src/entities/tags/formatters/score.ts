import {FormatterTagType} from "./types.ts";

type ScoreFormatterTagDataType = FormatterTagType<"score">;

export const scoreFormatterTag = {
    identifier: "day0ff:tag-formatter.score",
    name: 'tag.formatter.score.name',
    description: 'tag.formatter.score.description',
    style: {
        fontWeight: 'bold',
        color: 'cadetblue',
        textShadow: `-1px -1px 0 cadetblue, -1px 1px 0 #00000099, 0 2px 1px #00000099`
    },
} satisfies ScoreFormatterTagDataType;