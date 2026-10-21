import {RankType} from "../../types.ts";
import {HEAL_PASTEBOARD_CARDS_MAP} from "./heal-potions/constants.ts";
import {DARK_PASTEBOARD_CARDS_MAP} from "./dark-lord/constants.ts";
import {SKELETON_PASTEBOARD_CARDS_MAP} from "./skeleton/constants.ts";
import {WEAPON_PASTEBOARD_CARDS_MAP} from "./weapon/constants.ts";
import {PasteboardCardType} from "./types.ts";
import {FIST_PASTEBOARD_CARDS_MAP} from "./fist/constants.ts";

export const PASTEBOARD_CARDS_MAP = {
    ...DARK_PASTEBOARD_CARDS_MAP,
    ...HEAL_PASTEBOARD_CARDS_MAP,
    ...SKELETON_PASTEBOARD_CARDS_MAP,
    ...WEAPON_PASTEBOARD_CARDS_MAP,
    ...FIST_PASTEBOARD_CARDS_MAP,
} as const satisfies Partial<
    Record<
        PasteboardCardType<string, RankType>["identifier"],
        PasteboardCardType<string, RankType>
    >
>;
