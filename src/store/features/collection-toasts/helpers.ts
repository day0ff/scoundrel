import type {CollectionsStateType} from "store/features/collections/types.ts";
import type {CollectionToastType} from "./types.ts";

const getItems = (collections: CollectionsStateType) => [
    ...collections.heroes, ...collections.decks, ...collections.packs,
    ...collections.decks.flatMap(deck => deck.pasteboards),
];

export const getCollectionToasts = (before: CollectionsStateType, after: CollectionsStateType): CollectionToastType[] => {
    const previous = new Map(getItems(before).map(item => [item.identifier, item]));
    const toasts = new Map<string, CollectionToastType>();
    for (const item of getItems(after)) {
        const old = previous.get(item.identifier);
        if (!old) continue;
        const unlocked = old.isLocked && !item.isLocked;
        const discovered = old.isNotFound && !item.isNotFound;
        if (!unlocked && !discovered) continue;
        const kind = unlocked ? "unlocked" : "discovered";
        toasts.set(item.identifier, {
            id: `${item.identifier}:${kind}`,
            name: item.name, card: item.card, kind,
            before: {isLocked: old.isLocked, isNotFound: old.isNotFound},
            after: {isLocked: item.isLocked, isNotFound: item.isNotFound},
        });
    }
    return [...toasts.values()];
};
