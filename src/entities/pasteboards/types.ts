import {TranslationKeysType} from "localization/types.ts";
import type {EffectBindingType} from "entities/effects/types.ts";

import {RankType} from "../types.ts";
import {PasteboardCardType} from "../cards/pasteboard/types.ts";
import {CollectionType, IdentifierWithSubtypeType} from "../types";

export type PasteboardRoleType = "enemy" | "weapon" | "fist" | "potion";

type PasteboardTranslationKeysType<SuitType extends string, RankTypeType extends RankType, StringType extends string> = Extract<TranslationKeysType, `pasteboard.${SuitType}.${RankTypeType}.${StringType}`>;

type PasteboardType<Identifier extends string, SuitType extends string, RankTypeType extends RankType> = {
    identifier: IdentifierWithSubtypeType<Identifier, SuitType, RankTypeType>;
    name: PasteboardTranslationKeysType<SuitType, RankTypeType, 'name'>;
    description: PasteboardTranslationKeysType<SuitType, RankTypeType, 'description'>;
    card: PasteboardCardType<SuitType, RankTypeType>;
    suit: SuitType;
    rank: RankTypeType;
    role: PasteboardRoleType;
    durability?: number;
    effects?: EffectBindingType[];
}

export type PasteboardDataType<SuitType extends string, RankTypeType extends RankType> =
    PasteboardType<"pasteboard", SuitType, RankTypeType>
    & CollectionType;

export type InitPasteboardDataType<SuitType extends string, RankTypeType extends RankType> =
    PasteboardDataType<SuitType, RankTypeType>
    & {
        id: string;
        killedEnemies?: Array<{
            id: string;
            identifier: PasteboardDataType<string, RankType>["identifier"];
            rank: RankType;
        }>;
    };
