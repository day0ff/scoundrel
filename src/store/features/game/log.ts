import type {UnknownAction} from "@reduxjs/toolkit";
import type {GameStateType, GameLogActionType, GameLogType, GameSnapshotType} from "entities/game/types.ts";

const loggedActions = new Set([
    "surrenderGame", "startGame", "advancePhase", "skipRoom", "endTurn", "playCard", "attackCard", "moveCard",
    "addCardsToZone", "removeCardsFromZone", "setZoneCapacity", "setRoomMinimumCardsToPlay", "shuffleDungeon",
].map(name => `game/${name}`));

// Selection and animation queues are presentation state, not replay inputs.
export const getGameSnapshot = (state: GameStateType): GameSnapshotType => {
    const snapshot = {...state, mode: state.mode ?? "classic", selectedCardId: undefined, animationEvents: []};
    delete snapshot.log;
    return structuredClone(snapshot);
};

export const createGameLog = (state: GameStateType, origin: GameLogType["origin"]): GameLogType => ({
    version: 1,
    origin,
    initialState: getGameSnapshot(state),
    entries: [],
});

export const isLoggedGameAction = (action: UnknownAction): action is GameLogActionType => loggedActions.has(action.type);

// Preserve unlimited zone capacities when downloading/importing JSON.
export const stringifyGameLog = (value: unknown) => JSON.stringify(value, (_key, item) =>
    item === Infinity ? "__INFINITY__" : item === -Infinity ? "__NEG_INFINITY__" : item, 2);

export const parseGameLog = (json: string): GameLogType => JSON.parse(json, (_key, item) =>
    item === "__INFINITY__" ? Infinity : item === "__NEG_INFINITY__" ? -Infinity : item);
