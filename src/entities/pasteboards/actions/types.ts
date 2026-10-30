import type {PhaseDataType} from "entities/phases/types.ts";
import type {IdentifierWithSubtypeType, RankType} from "entities/types.ts";

export type PasteboardActionAnimationType = {
    borderColor?: string;
    glowColor?: string;
    fogColor?: string;
    shake?: boolean;
    swing?: boolean;
};

type PasteboardActionBaseType = {
    /** Stable within the card definition; also identifies this action's saved progress. */
    id: string;
    phase: PhaseDataType<string>["identifier"];
    animation?: PasteboardActionAnimationType;
};

export type PasteboardActionType = PasteboardActionBaseType & (
    | {type: "playSound"; url: string}
    | {type: "consumeEnemies"}
    | {type: "drainPotions"}
    | {type: "breakAllWeapons"; soundUrl: string}
    | {type: "hatchOnAttack"; identifier: IdentifierWithSubtypeType<"pasteboard", string, RankType | `${RankType}.${string}`>}
    | {type: "summonStrongestEnemyFromCrypt"}
    | {type: "call"; identifier: IdentifierWithSubtypeType<"pasteboard", string, RankType | `${RankType}.${string}`>}
    | {
        type: "summon";
        identifier: IdentifierWithSubtypeType<"pasteboard", string, RankType | `${RankType}.${string}`>;
        source: "existingOrCreate";
    }
    | {
        type: "summonSequence";
        suit: string;
        ranks: [RankType, ...RankType[]];
        count: "emptyRoomSlots";
        progression: "perCard";
    }
);
