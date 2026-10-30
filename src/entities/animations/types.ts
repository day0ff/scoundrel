import type {PasteboardActionAnimationType} from "entities/pasteboards/actions/types.ts";
import type {TranslationKeysType} from "localization/types.ts";
import type {InitPasteboardDataType} from "entities/pasteboards/types.ts";
import type {IdentifierType, RankType, StatType} from "entities/types.ts";

type AnimationTranslationKeysType<Type extends string> = Extract<TranslationKeysType, `animation.${Type}.${string}`>;

export type AnimationType<Identifier extends string, Type extends string> = {
    identifier: IdentifierType<Identifier, Type>;
    name: AnimationTranslationKeysType<Type>;
    description: AnimationTranslationKeysType<Type>;
    durationMs: number;
    color: string;
};

export type AnimationDataType<Type extends string> = AnimationType<"animation", Type>;

type HealthAnimationEventType = {
    animationCardId?: string;
    actionAnimation?: PasteboardActionAnimationType;
    id: number;
    healthBefore: StatType;
    healthAfter: StatType;
};

export type AttackAnimationEventType = HealthAnimationEventType & {
    animation: AnimationDataType<"attack">["identifier"];
    attackerId: string;
    attacker?: InitPasteboardDataType<string, RankType>;
    attackerZoneIndex?: number;
    enemyId: string;
    enemyRoomIndex?: number;
    enemy: InitPasteboardDataType<string, RankType>;
    healthDamage: number;
    weaponBroken: boolean;
};

export type ConsumeAnimationEventType = HealthAnimationEventType & {
    animation: AnimationDataType<"consume">["identifier"];
    consumerId: string;
    enemyId: string;
    roomBefore: InitPasteboardDataType<string, RankType>[];
};

export type SummonAnimationEventType = HealthAnimationEventType & {
    animation: AnimationDataType<"summon">["identifier"];
    summonerId: string;
    summonedId?: string;
    roomBefore: InitPasteboardDataType<string, RankType>[];
};

export type DrainAnimationEventType = HealthAnimationEventType & {
    animation: AnimationDataType<"drain">["identifier"];
    drainerId?: string;
    potionIds: string[];
    roomBefore: InitPasteboardDataType<string, RankType>[];
    potionsBefore: InitPasteboardDataType<string, RankType>[];
};

export type HatchAnimationEventType = HealthAnimationEventType & {
    animation: AnimationDataType<"hatch">["identifier"];
    egg: InitPasteboardDataType<string, RankType>;
    hatchlingId: string;
};

export type EffectAnimationEventType = (HealthAnimationEventType & {
    animation: AnimationDataType<"heal">["identifier"];
    potion?: InitPasteboardDataType<string, RankType>;
}) | AttackAnimationEventType | ConsumeAnimationEventType | SummonAnimationEventType | DrainAnimationEventType | HatchAnimationEventType;
