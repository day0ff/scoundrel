import {TranslationKeysType} from "localization/types.ts";
import {HandTypes} from "entities/constants.ts";
import {HandTypeType} from "entities/types.ts";

type HandTypeTranslationKeysType<Type> = Extract<TranslationKeysType, `hand.${HandTypeType}.${Type}`>;

export const HAND_TYPE_TRANSLATIONS_MAP: Record<HandTypeType, HandTypeTranslationKeysType<"name">>  = {
    [HandTypes.NONE]: "hand.none.name",
    [HandTypes.HIGH]: "hand.high.name",
    [HandTypes.PAIR]: "hand.pair.name",
    [HandTypes.TWO_PAIR]: "hand.twoPair.name",
    [HandTypes.SET]: "hand.set.name",
    [HandTypes.QUADS]: "hand.quads.name",
    [HandTypes.FULL_HOUSE]: "hand.fullHouse.name",
    [HandTypes.SMALL_STRAIGHT]: "hand.smallStraight.name",
    [HandTypes.STRAIGHT]: "hand.straight.name",
    [HandTypes.POKER]: "hand.poker.name"
} as const;

export const HAND_TYPE_DESCRIPTION_TRANSLATIONS_MAP: Record<HandTypeType, HandTypeTranslationKeysType<"description">>  = {
    [HandTypes.NONE]: "hand.none.description",
    [HandTypes.HIGH]: "hand.high.description",
    [HandTypes.PAIR]: "hand.pair.description",
    [HandTypes.TWO_PAIR]: "hand.twoPair.description",
    [HandTypes.SET]: "hand.set.description",
    [HandTypes.QUADS]: "hand.quads.description",
    [HandTypes.FULL_HOUSE]: "hand.fullHouse.description",
    [HandTypes.SMALL_STRAIGHT]: "hand.smallStraight.description",
    [HandTypes.STRAIGHT]: "hand.straight.description",
    [HandTypes.POKER]: "hand.poker.description"
} as const;