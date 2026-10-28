import {billetDeckCard} from "./decks/billet.ts";
import type {CardDataType} from "./types.ts";
import type {CollectionType} from "entities/types.ts";
import {CARDS_MAP} from "./constants.ts";

export const getBilletCard = (card: CardDataType<string, string>) => {
    const {type} = card;
    const billetIdentifier = `day0ff:card-${type}.billet` as CardDataType<string, string>["identifier"];
    const {name, color, face, back} = CARDS_MAP[billetIdentifier];

    return {
        ...card,
        name,
        color,
        face,
        back
    }
}

export const getCollectionCard = <T extends CardDataType<string, string>>(
    card: T,
    {isLocked, isNotFound}: Pick<CollectionType, "isLocked" | "isNotFound">,
): T => {
    if (!isLocked && !isNotFound) return card;
    return {
        ...card,
        face: {
            ...card.face,
            image: card.back.image,
            imageMode: billetDeckCard.face.imageMode,
            overlay: billetDeckCard.face.overlay,
            overlayMode: billetDeckCard.face.overlayMode,
            overlayColor: card.color ?? "black",
        },
        back: {
            ...card.back,
            imageMode: billetDeckCard.back.imageMode,
            overlay: billetDeckCard.back.overlay,
            overlayMode: billetDeckCard.back.overlayMode,
            overlayColor: card.color ?? "black",
        },
    };
};
