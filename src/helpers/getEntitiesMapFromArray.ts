import {IdentifierType} from "../entities/types.ts";

export const getEntitiesMapFromArray = <T extends { identifier: IdentifierType<string, string> }>(collection: Array<T>): Record<IdentifierType<string, string>, T> => {
    return Object.values(collection).reduce((acc, item) => {
        acc[item.identifier] = item;

        return acc;
    }, {} as Record<IdentifierType<string, string>, T>) ;
}