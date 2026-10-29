import type {PasteboardActionType} from "./actions/types.ts";
import {v4 as getUuid} from "uuid";
import {RankType} from "../types.ts";
import {DEFAULT_WEAPON_DURABILITY} from "./weapon/defaults.ts";
import {PASTEBOARD_DARK_MAP} from "./dark-lord/constants.ts";
import {PASTEBOARD_HEAL_MAP} from "./heal-potions/constants.ts";
import {PASTEBOARD_SKELETON_MAP} from "./skeleton/constants.ts";
import {PASTEBOARD_WEAPON_MAP} from "./weapon/constants.ts";
import {PASTEBOARD_FIST_MAP} from "./fist/constants.ts";
import {InitPasteboardDataType, PasteboardDataType} from "./types.ts";
import {getCardStrength} from "./helpers.ts";

const PASTEBOARD_MAP = {
    ...PASTEBOARD_DARK_MAP,
    ...PASTEBOARD_HEAL_MAP,
    ...PASTEBOARD_SKELETON_MAP,
    ...PASTEBOARD_WEAPON_MAP,
    ...PASTEBOARD_FIST_MAP,
} as const satisfies Record<
    PasteboardDataType<string, RankType>["identifier"],
    PasteboardDataType<string, RankType>
>;

export const initPasteboard = (
    identifier: PasteboardDataType<string, RankType>["identifier"]
): InitPasteboardDataType<string, RankType> => {
    // @ts-ignore
    const pasteboard = PASTEBOARD_MAP[identifier];

    return ({
        ...pasteboard,
        strength: getCardStrength(pasteboard),
        id: getUuid(),
    })
};

export const allPasteBoards = Object.values(PASTEBOARD_MAP);

export const getPasteboard = (identifier: PasteboardDataType<string, RankType>["identifier"]): PasteboardDataType<string, RankType> | undefined =>
    PASTEBOARD_MAP[identifier as keyof typeof PASTEBOARD_MAP];

export const getPasteboardEffects = (pasteboard: PasteboardDataType<string, RankType>) => {
    const definition: PasteboardDataType<string, RankType> | undefined = PASTEBOARD_MAP[pasteboard.identifier as keyof typeof PASTEBOARD_MAP];
    // Older saved card instances do not contain effect bindings yet.
    return pasteboard.effects ?? definition?.effects ?? [];
};

export const getPasteboardActions = (pasteboard: PasteboardDataType<string, RankType>): readonly PasteboardActionType[] => {
    const definition = getPasteboard(pasteboard.identifier);
    return pasteboard.actions ?? definition?.actions ?? [];
};

// Restore gameplay metadata for card instances saved before roles and durability.
export const restorePasteboard = <T extends PasteboardDataType<string, RankType>>(pasteboard: T): T => {
    const definition: PasteboardDataType<string, RankType> | undefined = PASTEBOARD_MAP[pasteboard.identifier as keyof typeof PASTEBOARD_MAP];
    const role = pasteboard.role ?? definition?.role;
    return {
        ...pasteboard,
        strength: getCardStrength({...pasteboard, strength: pasteboard.strength ?? definition?.strength}),
        actions: pasteboard.actions ?? definition?.actions,
        ...(role ? {role} : {}),
        ...(role === "weapon" ? {durability: pasteboard.durability ?? definition?.durability ?? DEFAULT_WEAPON_DURABILITY} : {}),
    };
};
