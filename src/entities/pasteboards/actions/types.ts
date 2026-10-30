import type {PhaseDataType} from "entities/phases/types.ts";
import type {IdentifierWithSubtypeType, RankType} from "entities/types.ts";

type PasteboardActionBaseType = {
    /** Stable within the card definition; also identifies this action's saved progress. */
    id: string;
    phase: PhaseDataType<string>["identifier"];
};

export type PasteboardActionType = PasteboardActionBaseType & (
    | {type: "consumeEnemies"}
    | {type: "summonStrongestEnemyFromCrypt"}
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
