
import {ValueOf} from "helpers";
import {TranslationKeysType} from "localization/types.ts";
import {HandTypes, RarityTypes, TimeTypes} from "./constants.ts";
import type {GameModeType} from "entities/game-modes/types.ts";
import type {PackIdentifierType} from "entities/packs/types.ts";

// F - as fool or joker, E - as either, B - as billet
export type RankType = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2' | '1' | '0' | 'F' | 'E' | 'B';

export type RarityType = ValueOf<typeof RarityTypes>;


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

export type CollectionConditionType =
    | {type: "gamesCompleted" | "gamesWon"; mode?: GameModeType; packIdentifier?: PackIdentifierType; count: number}
    | {type: "enemiesDefeated"; suit: string; count: number};

export type CollectionType = {
    isLocked: boolean;
    isNotFound: boolean;
    condition?: {
        description: TranslationKeysType;
        unlock?: CollectionConditionType;
        discover?: CollectionConditionType;
    };
}

export type IdentifierType<T extends string, P extends string> = `day0ff:${T}-${P}`;

export type IdentifierWithSubtypeType<T extends string, P extends string, S extends string> = `${IdentifierType<T, P>}.${S}`;
