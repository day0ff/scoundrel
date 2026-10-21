import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialDialogState} from "./constants.ts";
import {ReactNode} from "react";

export const dialogSlice = createSlice({
    name: "dialog",
    initialState: initialDialogState,
    reducers: {
        showDialogModal: (state, action: PayloadAction<{ content: ReactNode; onAccept?: () => void; onReject?: () => void; }>) => {
            state.isOpen = true;
            state.content = action.payload.content;
            state.onAccept = action.payload.onAccept || null;
            state.onReject = action.payload.onReject || null;
        },
        hideDialogModal: (state) => {
            state.isOpen = false;
            state.content = null;
            state.onAccept = null;
            state.onReject = null;
        },
    },
});

export const {
    showDialogModal,
    hideDialogModal,
} = dialogSlice.actions;

export default dialogSlice.reducer;