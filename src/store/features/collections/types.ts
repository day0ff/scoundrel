import {InitHeroDataType} from "entities/heroes/types.ts";
import {DeckDataType} from "entities/decks/types.ts";
import type {PackDataType, PackIdentifierType} from "entities/packs/types.ts";
import type {GameModeType} from "entities/game-modes/types.ts";
import type {GameOutcomeType} from "entities/game/types.ts";

export type CollectionProgressType = {
    gamesCompleted: Record<string, number>;
    gamesWon?: Record<string, number>;
    enemiesDefeated: Record<string, number>;
    processedEvents: Record<string, true>;
};

export type CollectionProgressEventType =
    | {id: string; type: "gameCompleted"; mode: GameModeType; packIdentifier: PackIdentifierType; outcome?: GameOutcomeType}
    | {id: string; type: "enemyDefeated"; suit: string};

export type CollectionsStateType = {
    heroes: Array<InitHeroDataType<string>>;
    decks: Array<DeckDataType<string>>;
    packs: Array<PackDataType<string>>;
    progress: CollectionProgressType;
};
