import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {initialSettingsState} from "./constants.ts";

export const settingsSlice = createSlice({
    name: "settings",
    initialState: initialSettingsState,
    reducers: {
        setMusicEnabled: (state, action: PayloadAction<boolean>) => {
            state.music ??= {...initialSettingsState.music};
            state.music.enabled = action.payload;
        },
        setMusicVolume: (state, action: PayloadAction<number>) => {
            if (!Number.isFinite(action.payload)) return;

            state.music ??= {...initialSettingsState.music};
            state.music.volume = Math.min(1, Math.max(0, action.payload));
        },
        setSoundEnabled: (state, action: PayloadAction<boolean>) => {
            state.sound.enabled = action.payload;
        },
        setSoundVolume: (state, action: PayloadAction<number>) => {
            if (!Number.isFinite(action.payload)) return;

            state.sound.volume = Math.min(1, Math.max(0, action.payload));
        },
    },
});

export const {setSoundEnabled, setSoundVolume, setMusicEnabled, setMusicVolume} = settingsSlice.actions;

export default settingsSlice.reducer;
