import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialCollectionsState} from "./constants.ts";
import {CollectionProgressEventType, CollectionsStateType} from "./types.ts";
import {evaluateCollection, getCompletedGamesKey} from "./helpers.ts";

export const collectionsSlice = createSlice({
    name: "collections",
    initialState: initialCollectionsState,
    reducers: {
        setCollections: (_state, action: PayloadAction<CollectionsStateType>) => {
            return action.payload;
        },
        recordCollectionProgress: (state, {payload}: PayloadAction<CollectionProgressEventType[]>) => {
            for (const event of payload) {
                if (state.progress.processedEvents[event.id]) continue;
                state.progress.processedEvents[event.id] = true;
                if (event.type === "gameCompleted") {
                    const key = getCompletedGamesKey(event.mode, event.packIdentifier);
                    state.progress.gamesCompleted[key] = (state.progress.gamesCompleted[key] ?? 0) + 1;
                    if (event.outcome === "victory") {
                        state.progress.gamesWon ??= {};
                        state.progress.gamesWon[key] = (state.progress.gamesWon[key] ?? 0) + 1;
                    }
                } else {
                    state.progress.enemiesDefeated[event.suit] = (state.progress.enemiesDefeated[event.suit] ?? 0) + 1;
                }
            }
            // Resolve prerequisite packs regardless of their collection order.
            for (let pass = 0; pass < state.packs.length; pass++) {
                const lockedCount = state.packs.filter(pack => pack.isLocked).length;
                for (const pack of state.packs) evaluateCollection(pack, state.progress, state.packs);
                if (state.packs.filter(pack => pack.isLocked).length === lockedCount) break;
            }
            for (const item of [...state.heroes, ...state.decks, ...state.packs, ...state.decks.flatMap(deck => deck.pasteboards)]) {
                evaluateCollection(item, state.progress, state.packs);
            }
        },
    },
});

export const {
    setCollections,
    recordCollectionProgress,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
