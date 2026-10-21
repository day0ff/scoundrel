import type {TranslationKeysType} from "localization/types.ts";
import type {ScoreType} from "store/features/types.ts";
import type {CollectionType, IdentifierType, StatType} from "entities/types.ts";
import type {PhaseDataType} from "entities/phases/types.ts";
import type {AnimationDataType} from "entities/animations/types.ts";

type EffectTranslationKeysType<Type extends string> = Extract<TranslationKeysType, `effect.${Type}.${string}`>;

export type EffectPayload = Partial<ScoreType & {
    amount: number;
    side: number;
}>;

export type EffectType<Identifier extends string, Type extends string> = {
    identifier: IdentifierType<Identifier, Type>;
    name: EffectTranslationKeysType<Type>;
    description: EffectTranslationKeysType<Type>;
    color: string;
    animation: AnimationDataType<"heal">["identifier"];
    action: (health: StatType, amount: number) => StatType;
}

export type EffectDataType<Type extends string> = EffectType<"effect", Type> & CollectionType;

export type EffectBindingType = {
    effect: EffectDataType<"heal">["identifier"];
    phase: PhaseDataType<string>["identifier"];
    target: "hero";
    amount: number;
};
