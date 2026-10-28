import assert from "node:assert/strict";
import {configureStore} from "@reduxjs/toolkit";
import {allPacks} from "entities/packs/constants.ts";
import {classicPack} from "entities/packs/classic.ts";
import type {PackDataType} from "entities/packs/types.ts";
import type {AppDispatch, RootState} from "store/types.ts";
import profilesReducer, {setCurrentProfileId} from "store/features/profiles";
import {selectedPackIdentifierSelector} from "store/features/profiles/selectors.ts";
import {profilesListenerMiddleware} from "store/features/profiles/middleware.ts";
import type {ProfilesStateType} from "store/features/profiles/types.ts";
import collectionsReducer, {setCollections} from "store/features/collections";
import {initialCollectionsState} from "store/features/collections/constants.ts";
import {serializeTransform} from "store/serializer.ts";
import gameReducer, {clearGame, startGame, surrenderGame} from "./index.ts";
import {getInitialGame} from "./constants.ts";
import {restoreGame} from "./helpers.ts";
import {gameListenerMiddleware} from "./middleware.ts";
import {resetSelectedDungeon, selectGamePack} from "./actions.ts";
import {activePackSelector} from "./selectors.ts";
import {doesReplayMatchGame} from "./replay.ts";

const alternate: PackDataType<string> = {
    ...classicPack,
    identifier: "day0ff:pack-test-alternate",
    castle: "/test/castle.png", room: "/test/room.png",
    dungeon: "/test/dungeon.png", discard: "/test/discard.png", crypt: "/test/crypt.png",
    decks: [{identifier: "day0ff:deck-skeleton", cards: ["day0ff:pasteboard-skeleton.2"]}],
};

const makeStore = (profiles: ProfilesStateType = {
    currentProfileId: "first",
    profiles: ["first", "second"].map(profileId => ({
        profileId, name: profileId, collections: {...initialCollectionsState, packs: [...initialCollectionsState.packs, alternate]}, games: {},
    })),
}) => configureStore({
    reducer: {game: gameReducer, profiles: profilesReducer, collections: collectionsReducer},
    preloadedState: {profiles, collections: profiles.profiles.find(profile => profile.profileId === profiles.currentProfileId)?.collections ?? initialCollectionsState},
    middleware: getDefault => getDefault({serializableCheck: false}).concat(
        gameListenerMiddleware.middleware, profilesListenerMiddleware.middleware,
    ),
});

export const runGamePackTests = () => {
    allPacks.push(alternate);
    try {
        const initial = getInitialGame(undefined, "classic", alternate.identifier);
        assert.equal(initial.mode, "classic");
        assert.equal(initial.packIdentifier, alternate.identifier);
        assert.equal(initial.zones.dungeon.cards.length, 1);
        assert.equal(initial.zones.dungeon.cards[0].identifier, "day0ff:pasteboard-skeleton.2");
        assert.equal(initial.started, false);
        assert.ok(initial.log);
        assert.equal(initial.log.initialState.packIdentifier, alternate.identifier);
        assert.ok(doesReplayMatchGame(initial.log, initial));

        const store = makeStore();
        const dispatch = store.dispatch as AppDispatch;
        const selected = () => selectedPackIdentifierSelector(store.getState() as RootState);
        assert.equal(selected(), classicPack.identifier);
        dispatch(selectGamePack(alternate.identifier));
        assert.equal(selected(), alternate.identifier, "selection remembers the alternate pack");
        assert.equal(activePackSelector(store.getState() as RootState), alternate);
        const preview = store.getState().game;
        assert.ok(preview);
        dispatch(selectGamePack(alternate.identifier));
        assert.equal(store.getState().game, preview);
        dispatch(startGame());
        dispatch(surrenderGame());
        assert.equal(store.getState().game?.outcome, "defeat");
        dispatch(resetSelectedDungeon());
        assert.equal(store.getState().game?.packIdentifier, alternate.identifier);
        assert.equal(store.getState().game?.hero.identifier, preview.hero.identifier);
        assert.equal(store.getState().game?.started, false);
        dispatch(clearGame());
        assert.equal(store.getState().game, null);
        assert.equal(selected(), alternate.identifier, "clearing a game preserves alternate selection");
        assert.equal(activePackSelector(store.getState() as RootState).castle, alternate.castle);

        // A profile without a run or selection must not inherit the previous profile's pack.
        dispatch(setCurrentProfileId("second"));
        assert.equal(selected(), classicPack.identifier);
        dispatch(resetSelectedDungeon());
        assert.equal(store.getState().game?.packIdentifier, classicPack.identifier);
        dispatch(setCurrentProfileId("first"));
        assert.equal(store.getState().game, null);
        assert.equal(selected(), alternate.identifier, "switching back restores alternate selection");
        assert.equal(activePackSelector(store.getState() as RootState).castle, alternate.castle);

        // Persist and restore after defeat, when only the remembered selection remains.
        const serialized = serializeTransform.in(store.getState().profiles, "profiles", {});
        const restoredProfiles = serializeTransform.out(JSON.parse(JSON.stringify(serialized)), "profiles", {});
        const restoredStore = makeStore(restoredProfiles);
        (restoredStore.dispatch as AppDispatch)(resetSelectedDungeon());
        assert.equal(restoredStore.getState().game?.packIdentifier, alternate.identifier);

        const legacy = getInitialGame();
        Reflect.deleteProperty(legacy, "packIdentifier");
        assert.equal(restoreGame(legacy).packIdentifier, classicPack.identifier);

        const beforeInvalidSelection = store.getState();
        dispatch(selectGamePack("day0ff:pack-test-missing"));
        assert.equal(store.getState(), beforeInvalidSelection);
        dispatch(setCollections({...store.getState().collections, packs: store.getState().collections.packs.map(pack =>
            pack.identifier === alternate.identifier ? {...pack, isLocked: true} : pack)}));
        const beforeLockedSelection = store.getState();
        dispatch(selectGamePack(alternate.identifier));
        assert.equal(store.getState(), beforeLockedSelection);

        return [
            "Classic rules initialize the selected pack's cards and replay snapshot",
            "reroll and retry preserve pack and hero; clearing a defeated run preserves selection",
            "pack selection is isolated by profile and survives persistence without a run",
            "restored games default to Classic; unavailable pack selection is ignored",
        ];
    } finally {
        allPacks.splice(allPacks.indexOf(alternate), 1);
    }
};
