import {CollectionType} from "./types.ts";
import {notFoundCollectionTag} from "./notFound.ts";
import {lockedCollectionTag} from "./locked.ts";

export const COLLECTIONS_TAGS_MAP: Record<CollectionType<string>["identifier"], CollectionType<string>> = {
    "day0ff:tag-collection.notFound": notFoundCollectionTag,
    "day0ff:tag-collection.locked": lockedCollectionTag,
} as const;
