import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {setCurrentProfileId} from "store/features/profiles";
import type {CollectionToastType} from "./types.ts";

const collectionToastsSlice = createSlice({
    name: "collectionToasts",
    initialState: [] as CollectionToastType[],
    reducers: {
        enqueueCollectionToasts: (state, {payload}: PayloadAction<CollectionToastType[]>) => {
            for (const toast of payload) {
                if (!state.some(item => item.id === toast.id)) state.push(toast);
            }
        },
        dismissCollectionToast: (state, {payload}: PayloadAction<string>) => state.filter(toast => toast.id !== payload),
    },
    // Notifications belong to the player who earned them and are never persisted.
    extraReducers: builder => builder.addCase(setCurrentProfileId, () => []),
});

export const {enqueueCollectionToasts, dismissCollectionToast} = collectionToastsSlice.actions;
export default collectionToastsSlice.reducer;
