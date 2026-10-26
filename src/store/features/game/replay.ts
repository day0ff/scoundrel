import {gameSlice} from "./index.ts";
import {getGameSnapshot, stringifyGameLog} from "./log.ts";
import type {GameStateType, GameLogType} from "entities/game/types.ts";

// Apply recorded actions directly to the same slice, without logging or persistence side effects.
export const replayGameLog = (log: GameLogType, moveCount = log.entries.length): GameStateType => {
    if (log.version !== 1) throw new Error("Unsupported game log version");
    if (!Number.isSafeInteger(moveCount) || moveCount < 0 || moveCount > log.entries.length) throw new Error("Invalid replay position");
    let state: GameStateType = {...structuredClone(log.initialState), mode: log.initialState.mode ?? "classic"};
    for (const entry of log.entries.slice(0, moveCount)) {
        const next = gameSlice.reducer(state, {...entry.action, type: entry.action.type.replace(/^classicGame\//, "game/")});
        if (!next) throw new Error("Replay cleared the game");
        state = next;
    }
    return state;
};

// Race time is measured by the page and is not reproduced by gameplay actions.
export const doesReplayMatchGame = (log: GameLogType, state: GameStateType) =>
    stringifyGameLog(getGameSnapshot(replayGameLog(log))) === stringifyGameLog(getGameSnapshot({...state, time: log.initialState.time}));
