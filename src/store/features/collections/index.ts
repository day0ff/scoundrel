import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialCollectionsState} from "./constants.ts";
import {CollectionsStateType} from "./types.ts";

export const collectionsSlice = createSlice({
    name: "collections",
    initialState: initialCollectionsState,
    reducers: {
        setCollections: (_state, action: PayloadAction<CollectionsStateType>) => {
            return action.payload;
        },
    },
});

export const {
    setCollections
} = collectionsSlice.actions;

export default collectionsSlice.reducer;