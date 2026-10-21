import {TagDataType} from "../types.ts";

export type SuitTagType<Subtype extends string> = TagDataType<'suit', Subtype> & {
    type: Subtype;
    src: string;
};