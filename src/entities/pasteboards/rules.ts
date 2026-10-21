import type {PasteboardDataType} from "./types.ts";
import type {RankType} from "entities/types.ts";

export const canTakeCardInHand = (card: Pick<PasteboardDataType<string, RankType>, "suit">): boolean =>
    card.suit === "heal" || card.suit === "weapon";
