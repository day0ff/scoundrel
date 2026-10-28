import type {CollectionConditionType, CollectionType} from "entities/types.ts";
import type {GameModeType} from "entities/game-modes/types.ts";
import type {PackIdentifierType} from "entities/packs/types.ts";
import type {CollectionProgressType} from "./types.ts";

export const getCompletedGamesKey = (mode: GameModeType, packIdentifier: PackIdentifierType) => `${mode}:${packIdentifier}`;

export const isConditionSatisfied = (condition: CollectionConditionType, progress: CollectionProgressType): boolean => {
    switch (condition.type) {
        case "gamesCompleted":
        case "gamesWon": {
            const games = condition.type === "gamesWon" ? progress.gamesWon ?? {} : progress.gamesCompleted;
            const completed = Object.entries(games).reduce((total, [key, count]) => {
                if (condition.mode && !key.startsWith(`${condition.mode}:`)) return total;
                if (condition.packIdentifier && !key.endsWith(`:${condition.packIdentifier}`)) return total;
                return total + count;
            }, 0);
            return completed >= condition.count;
        }
        case "enemiesDefeated":
            return (progress.enemiesDefeated[condition.suit] ?? 0) >= condition.count;
    }
};

export const evaluateCollection = (item: CollectionType, progress: CollectionProgressType) => {
    if (item.condition?.unlock && isConditionSatisfied(item.condition.unlock, progress)) item.isLocked = false;
    if (item.condition?.discover && isConditionSatisfied(item.condition.discover, progress)) item.isNotFound = false;
};
