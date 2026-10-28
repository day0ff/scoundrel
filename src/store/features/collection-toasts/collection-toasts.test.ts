import assert from "node:assert/strict";
import {configureStore} from "@reduxjs/toolkit";
import collections, {recordCollectionProgress, setCollections} from "store/features/collections";
import {initialCollectionsState} from "store/features/collections/constants.ts";
import {collectionsListenerMiddleware} from "store/features/collections/middleware.ts";
import profiles, {setCurrentProfileId} from "store/features/profiles";
import {getRevealCard} from "components/CollectionToasts/components/CollectionReveal/helpers.ts";
import {billetDeckCard} from "entities/cards/decks/billet.ts";
import collectionToasts, {dismissCollectionToast, enqueueCollectionToasts} from "./index.ts";

export const runCollectionToastTests = () => {
    const initial = structuredClone(initialCollectionsState);
    const pack = initial.packs.find(item => item.identifier === "day0ff:pack-necromancer")!;
    pack.isLocked = true;
    pack.isNotFound = true;
    pack.condition = {
        description: "pack.necromancer.unlock.description",
        unlock: {type: "enemiesDefeated", suit: "skeleton", count: 2},
        discover: {type: "enemiesDefeated", suit: "skeleton", count: 1},
    };
    const store = configureStore({
        reducer: {collections, collectionToasts, profiles},
        preloadedState: {collections: initial},
        middleware: getDefault => getDefault({serializableCheck: false}).concat(collectionsListenerMiddleware.middleware),
    });
    store.dispatch(setCollections(initial));
    assert.equal(store.getState().collectionToasts.length, 0);
    store.dispatch(recordCollectionProgress([{id: "enemy:one", type: "enemyDefeated", suit: "skeleton"}]));
    const discovered = store.getState().collectionToasts[0];
    assert.equal(discovered.kind, "discovered");
    assert.deepEqual(discovered.before, {isLocked: true, isNotFound: true});
    assert.deepEqual(discovered.after, {isLocked: true, isNotFound: false});
    assert.equal(getRevealCard(discovered.card, discovered.after).face.overlay, billetDeckCard.back.overlay);
    assert.equal(getRevealCard(discovered.card, {isLocked: false, isNotFound: true}).face.overlay, billetDeckCard.face.overlay);
    assert.equal(getRevealCard(discovered.card, discovered.before).face.overlayColor, discovered.card.color);
    store.dispatch(recordCollectionProgress([{id: "enemy:one", type: "enemyDefeated", suit: "skeleton"}]));
    assert.equal(store.getState().collectionToasts.length, 1);
    store.dispatch(recordCollectionProgress([{id: "enemy:two", type: "enemyDefeated", suit: "skeleton"}]));
    const unlocked = store.getState().collectionToasts[1];
    assert.equal(unlocked.kind, "unlocked");
    assert.deepEqual(unlocked.after, {isLocked: false, isNotFound: false});
    assert.equal(getRevealCard(unlocked.card, unlocked.after), unlocked.card);
    store.dispatch(enqueueCollectionToasts([unlocked]));
    assert.equal(store.getState().collectionToasts.length, 2);
    store.dispatch(dismissCollectionToast(discovered.id));
    assert.equal(store.getState().collectionToasts[0].id, unlocked.id);
    store.dispatch(setCurrentProfileId(null));
    assert.equal(store.getState().collectionToasts.length, 0);

    const simultaneous = structuredClone(initial);
    simultaneous.packs.find(item => item.identifier === pack.identifier)!.condition!.unlock = {type: "enemiesDefeated", suit: "skeleton", count: 1};
    store.dispatch(setCollections(simultaneous));
    store.dispatch(recordCollectionProgress([{id: "enemy:both", type: "enemyDefeated", suit: "skeleton"}]));
    assert.equal(store.getState().collectionToasts.length, 1);
    assert.equal(store.getState().collectionToasts[0].kind, "unlocked");
    const restored = store.getState().collections;
    store.dispatch(dismissCollectionToast(store.getState().collectionToasts[0].id));
    store.dispatch(setCollections(restored));
    assert.equal(store.getState().collectionToasts.length, 0);
    return [
        "collection notifications queue discovery and unlock transitions once and clear on profile change",
        "simultaneous discovery and unlock produce one reveal; restoring collections produces no toast",
        "reveals show the correct lock or question overlay and preserve any remaining lock",
    ];
};
