
import {ValueOf} from "helpers";
import {TranslationKeysType} from "localization/types.ts";
import {EntityTypes, HandTypes, RarityTypes, TimeTypes} from "./constants.ts";

// F - as fool or joker, E - as either, B - as billet
export type RankType = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2' | '1' | '0' | 'F' | 'E' | 'B';

export type RarityType = ValueOf<typeof RarityTypes>;

export type EntityTypeType = ValueOf<typeof EntityTypes>;

export type HandTypeType = ValueOf<typeof HandTypes>;

export type TimeType = ValueOf<typeof TimeTypes>;

export type StatType = {
    max: number;
    min: number;
    current: number;
}

export type StatItemsType<T> = StatType & {
    items: Array<T>;
}

export type CollectionType = {
    isLocked: boolean;
    isNotFound: boolean;
    condition?: {
        description: TranslationKeysType;
    };
}

export type IdentifierType<T extends string, P extends string> = `day0ff:${T}-${P}`;

export type IdentifierWithSubtypeType<T extends string, P extends string, S extends string> = `${IdentifierType<T, P>}.${S}`;
