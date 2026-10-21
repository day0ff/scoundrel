import {TagDataType} from "../types.ts";

export type FormatterTagType<Subtype extends string> = TagDataType<'formatter', Subtype>;