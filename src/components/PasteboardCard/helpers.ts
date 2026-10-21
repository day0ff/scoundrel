import {PasteboardCardType} from "entities/cards/pasteboard/types.ts";
import {RankType} from "entities/types.ts";
import {PASTEBOARD_CARDS_MAP} from "entities/cards/pasteboard/constants.ts";

export const getBCard = (card: PasteboardCardType<string, RankType>) => {
    const {suit} = card;
    const billetIdentifier = `day0ff:card-pasteboard.${suit}.B` as PasteboardCardType<string, RankType>["identifier"];
    const cards: Partial<Record<typeof billetIdentifier, PasteboardCardType<string, RankType>>> = PASTEBOARD_CARDS_MAP;
    const billet = cards[billetIdentifier];
    if (!billet) return card;
    const {name, color, face, back} = billet;

    return {
        ...card,
        name,
        color,
        face,
        back
    }
}