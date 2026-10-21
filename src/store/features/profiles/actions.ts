import {PayloadAction} from "@reduxjs/toolkit";

export const setCurrentProfileIdAction = <T extends {
    currentProfileId: string | null | undefined
} | null>(state: T, action: PayloadAction<string | null>) => {
    if (state === null) return;

    state.currentProfileId = action.payload;
}
