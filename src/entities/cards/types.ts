import {CSSProperties} from "react";
import {IdentifierType, IdentifierWithSubtypeType, RankType} from "../types";
import {TranslationKeysType} from "../../localization/types.ts";

export type MixBlendMode = CSSProperties["mixBlendMode"];

export type CardSideType = Partial<{
    base: string;
    image: string;
    imageMode?: MixBlendMode;
    overlay: string;
    overlayMode?: MixBlendMode;
}>;

type CardTranslationKeysType<Type extends string, Subtype extends string> = Extract<TranslationKeysType, `card.${Type}.${Subtype}.name`>;

type CardType<Identifier extends string, Type extends string, Subtype extends string> = {
    identifier: IdentifierWithSubtypeType<Identifier, Type, Subtype>;
    type: Type;
    name: CardTranslationKeysType<Type, Subtype>;
    color?: string;
    face: CardSideType;
    back: CardSideType;
}

export type CardDataType<Type extends string, Subtype extends string> = CardType<"card", Type, Subtype>;

export type PasteboardIdentifierType<T extends string, P extends string, S extends string, R extends string> = `${IdentifierType<T, P>}.${S}.${R}`;

type PasteboardCardTranslationKeysType<Type extends string, SuitType extends string, RankTypeType extends RankType> = Extract<TranslationKeysType, `card.${Type}.${SuitType}.${RankTypeType}.name`>;

type PasteboardCardTypeType<Identifier extends string, Type extends string, SuitType extends string, RankTypeType extends RankType> = {
    identifier: PasteboardIdentifierType<Identifier, Type, SuitType, RankTypeType>;
    type: Type;
    suit: SuitType;
    rank: RankTypeType;
    name: PasteboardCardTranslationKeysType<Type, SuitType, RankTypeType>;
    color?: string;
    face: CardSideType;
    back: CardSideType;
}

export type PasteboardCardDataType<Type extends string, SuitType extends string, RankTypeType extends RankType> = PasteboardCardTypeType<"card", Type, SuitType, RankTypeType>;
