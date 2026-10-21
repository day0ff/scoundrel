import {CardDataType} from "./types.ts";
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