import {CollectionType} from "./types.ts";

type LockedCollectionTagDataType = CollectionType<"locked">;

export const lockedCollectionTag = {
    identifier: "day0ff:tag-collection.locked",
    name: 'tag.collection.locked.name',
    description: 'tag.collection.locked.description',
    style: {
        fontWeight: 'bold',
        color: 'cadetblue',
        textShadow: `-1px -1px 0 cadetblue, -1px 1px 0 #00000099, 0 2px 1px #00000099`
    },
} satisfies LockedCollectionTagDataType;