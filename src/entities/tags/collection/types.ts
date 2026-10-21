import {TagDataType} from "../types.ts";

export type CollectionType<Subtype extends string> = TagDataType<'collection', Subtype>;