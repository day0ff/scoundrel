import type {RankType} from "../../../types.ts";
import type {FistCardType} from "./types.ts";
import {zeroFistPasteboardCard} from "./0.ts";
import {billetFistPasteboardCard} from "./B.ts";

export const FIST_PASTEBOARD_CARDS_MAP = {
    "day0ff:card-pasteboard.fist.0": zeroFistPasteboardCard,
    "day0ff:card-pasteboard.fist.B": billetFistPasteboardCard,
} as const satisfies Partial<
    Record<
        FistCardType<RankType>["identifier"],
        FistCardType<RankType>
    >
>;
