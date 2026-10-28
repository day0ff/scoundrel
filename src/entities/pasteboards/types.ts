import {TranslationKeysType} from "localization/types.ts";
import type {EffectBindingType} from "entities/effects/types.ts";

import {RankType} from "../types.ts";
import {PasteboardCardType} from "../cards/pasteboard/types.ts";
import {CollectionType, IdentifierWithSubtypeType} from "../types";

export type PasteboardRoleType = "enemy" | "weapon" | "fist" | "potion";

type PasteboardTranslationKeysType<SuitType extends string, RankTypeType extends RankType, StringType extends string, VariantType extends string> = Extract<TranslationKeysType,
    `pasteboard.${SuitType}.${RankTypeType}.${StringType}` | `pasteboard.${SuitType}.${RankTypeType}.${VariantType}.${StringType}`>;

type PasteboardType<Identifier extends string, SuitType extends string, RankTypeType extends RankType, VariantType extends string> = {
    identifier: IdentifierWithSubtypeType<Identifier, SuitType, RankTypeType | `${RankTypeType}.${VariantType}`>;
    name: PasteboardTranslationKeysType<SuitType, RankTypeType, 'name', VariantType>;
    description: PasteboardTranslationKeysType<SuitType, RankTypeType, 'description', VariantType>;
    card: PasteboardCardType<SuitType, RankTypeType, VariantType>;
    suit: SuitType;
    rank: RankTypeType;
    variant?: VariantType;
    role: PasteboardRoleType;
    strength?: number;
    roomEntryEffect?:
        | {type: "consumeEnemies"}
        | {type: "summon"; identifier: IdentifierWithSubtypeType<"pasteboard", string, RankType | `${RankType}.${string}`>};
    durability?: number;
    effects?: EffectBindingType[];
}

export type PasteboardDataType<SuitType extends string, RankTypeType extends RankType, VariantType extends string = string> =
    PasteboardType<"pasteboard", SuitType, RankTypeType, VariantType>
    & CollectionType;

export type InitPasteboardDataType<SuitType extends string, RankTypeType extends RankType, VariantType extends string = string> =
    PasteboardDataType<SuitType, RankTypeType, VariantType>
    & {
        id: string;
        roomEntries?: number;
        killedEnemies?: Array<{
            id: string;
            identifier: PasteboardDataType<string, RankType>["identifier"];
            rank: RankType;
            strength?: number;
        }>;
    };
