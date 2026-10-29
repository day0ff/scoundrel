import type {TranslationKeysType} from "localization/types.ts";
import type {IdentifierType} from "entities/types.ts";

type PhaseTranslationKeysType<Type extends string> = Extract<TranslationKeysType, `phase.${Type}.${string}`>;

export type PhaseType<Identifier extends string, Type extends string> = {
    identifier: IdentifierType<Identifier, Type>;
    name: PhaseTranslationKeysType<Type>;
    description: PhaseTranslationKeysType<Type>;
    trigger: "roomEntered" | "cardPlayed" | "turnStarted" | "playerActionStarted" | "beforeTurnEnded" | "turnEnded";
};

export type PhaseDataType<Type extends string> = PhaseType<"phase", Type>;

export type PhaseLifecycleType = {
    identifier: IdentifierType<"phaseLifecycle", string>;
    phases: PhaseDataType<string>["identifier"][];
    waitingPhase: PhaseDataType<string>["identifier"];
};
