import {PACKS_CARDS_MAP} from "./constants.ts";
import type {PackCardType} from "./types.ts";

/** Customize a pack card without changing its shared definition. */
export const getPackCard = (
    identifier: keyof typeof PACKS_CARDS_MAP,
    overrides: Partial<PackCardType<string>> = {},
): PackCardType<string> => {
    const card = PACKS_CARDS_MAP[identifier];
    return {
        ...card,
        ...overrides,
        face: {...card.face, ...overrides.face},
        back: {...card.back, ...overrides.back},
    };
};
