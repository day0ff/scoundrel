import {migrateGameState} from "./migrations.ts";
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {createMigrate, persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

import collections from "store/features/collections";
import dialog from "store/features/dialog";
import profiles from "store/features/profiles";
import settings from "store/features/settings";
import records from "store/features/records";
import {recordsListenerMiddleware} from "store/features/records/middleware.ts";
import {gameListenerMiddleware} from "./features/game/middleware.ts";
import game from "store/features/game";
import {profilesListenerMiddleware} from "store/features/profiles/middleware.ts";
import {profilesTransform} from "store/features/profiles/transform";
import {IS_DEV, NOT_PERSIST} from "constants.ts";
import {rehydrateListenerMiddleware} from "./middleware.ts";
import {serializeTransform} from "./serializer.ts";

// ---- PERSIST CONFIG ----
const persistConfig = {
    key: 'root',
    version: 0,
    migrate: createMigrate({
        0: migrateGameState,
    }),
    storage,
    whitelist: ['profiles', 'settings', 'game', 'records'], // "animation", "collections", "dialog", "game" and "roll" slices are ignored
    transforms: [profilesTransform, serializeTransform],
};

export const rootReducer = combineReducers({
    collections,
    dialog,
    profiles,
    settings,
    game,
    records,
});

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ---- STORE ----
export const store = configureStore({
    // @ts-ignore
    reducer: NOT_PERSIST ? rootReducer : persistedReducer,
    devTools: IS_DEV && {
        serialize: {
            options: {
                undefined: true,
                function: (fn: any) => fn.toString()
            }
        },
    },
    // @ts-ignore
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,// redux-persist uses non-serializable values internally
        })
            .concat(rehydrateListenerMiddleware.middleware)
            .concat(profilesListenerMiddleware.middleware)
            .concat(gameListenerMiddleware.middleware)
            .concat(recordsListenerMiddleware.middleware),
});

export const persistor = NOT_PERSIST ? null : persistStore(store);
