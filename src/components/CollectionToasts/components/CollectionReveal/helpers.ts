import {billetDeckCard} from "entities/cards/decks/billet.ts";
import type {CollectionToastType} from "store/features/collection-toasts/types.ts";

export const getRevealCard = (card: CollectionToastType["card"], state: CollectionToastType["before"]) => {
    if (!state.isLocked && !state.isNotFound) return card;
    const overlay = state.isLocked ? billetDeckCard.back : billetDeckCard.face;
    return {
        ...card,
        face: {
            ...card.face,
            image: card.back.image,
            imageMode: overlay.imageMode,
            overlay: overlay.overlay,
            overlayMode: overlay.overlayMode,
            overlayColor: card.color ?? "black",
        },
    };
};
