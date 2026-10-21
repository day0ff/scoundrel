import {CollectionType} from "./types.ts";

type NotDiscoveredCollectionTagDataType = CollectionType<"notFound">;

export const notFoundCollectionTag = {
    identifier: "day0ff:tag-collection.notFound",
    name: 'tag.collection.notFound.name',
    description: 'tag.collection.notFound.description',
    style: {
        fontWeight: 'bold',
        color: 'cadetblue',
        textShadow: `-1px -1px 0 cadetblue, -1px 1px 0 #00000099, 0 2px 1px #00000099`
    },
} satisfies NotDiscoveredCollectionTagDataType;