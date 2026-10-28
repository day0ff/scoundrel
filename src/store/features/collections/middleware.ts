import {createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import type {RootState} from "store/types.ts";
import {advancePhase, attackCard, endTurn, moveCard, playCard, skipRoom, startGame, surrenderGame} from "store/features/game";
import {updateProfileCollectionsData} from "store/features/profiles";
import {recordCollectionProgress, setCollections} from "./index.ts";
import type {CollectionProgressEventType} from "./types.ts";
import {enqueueCollectionToasts} from "store/features/collection-toasts";
import {getCollectionToasts} from "store/features/collection-toasts/helpers.ts";

export const collectionsListenerMiddleware = createListenerMiddleware();

collectionsListenerMiddleware.startListening({
    matcher: isAnyOf(advancePhase, attackCard, endTurn, moveCard, playCard, skipRoom, startGame, surrenderGame),
    effect: (action, api) => {
        const before = (api.getOriginalState() as RootState).game;
        const after = (api.getState() as RootState).game;
        if (!before || !after || before === after || before.outcome || after.started === false) return;
        const events: CollectionProgressEventType[] = [];
        // Only combat actions can award kills; discarding and administrative card moves cannot.
        if (attackCard.match(action) || moveCard.match(action)) {
            const cryptIds = new Set(before.zones.crypt.cards.map(card => card.id));
            for (const card of after.zones.crypt.cards) {
                if (card.role === "enemy" && !cryptIds.has(card.id)
                    && before.zones.room.cards.some(enemy => enemy.id === card.id)
                    && after.animationSequence > before.animationSequence) {
                    events.push({id: `enemy:${card.id}`, type: "enemyDefeated", suit: card.suit});
                }
            }
        }
        if (after.outcome) {
            // Initial card UUIDs identify a run even if its hero or seed is reused on retry.
            const initial = after.log?.initialState;
            const runId = initial && Object.values(initial.zones).flatMap(zone => zone.cards)[0]?.id;
            if (runId) events.push({id: `game:${runId}`, type: "gameCompleted", mode: after.mode, packIdentifier: after.packIdentifier, outcome: after.outcome});
        }
        if (events.length) api.dispatch(recordCollectionProgress(events));
    },
});

collectionsListenerMiddleware.startListening({
    matcher: isAnyOf(recordCollectionProgress, setCollections),
    effect: (action, api) => {
        if (recordCollectionProgress.match(action)) {
            const before = (api.getOriginalState() as RootState).collections;
            const after = (api.getState() as RootState).collections;
            const toasts = getCollectionToasts(before, after);
            if (toasts.length) api.dispatch(enqueueCollectionToasts(toasts));
        }
        api.dispatch(updateProfileCollectionsData((api.getState() as RootState).collections));
    },
});
