import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RecordGameType, RecordsStateType, WinningRecordType} from "./types.ts";

const initialState: RecordsStateType = [{
    gameType: "classic",
    records: [{playerName: "Scoundrel", score: 1, time: "01:07:00"}],
}];

const recordsSlice = createSlice({
    name: "records",
    initialState,
    reducers: {
        addWinningRecord: (state, {payload}: PayloadAction<{gameType: RecordGameType; record: WinningRecordType}>) => {
            const group = state.find(item => item.gameType === payload.gameType);
            if (group) group.records.push(payload.record);
            else state.push({gameType: payload.gameType, records: [payload.record]});
        },
        finalizeWinningRecordTime: (state, {payload}: PayloadAction<{gameType: RecordGameType; time: string}>) => {
            const record = state.find(item => item.gameType === payload.gameType)?.records.at(-1);
            if (record) record.time = payload.time;
        },
    },
});

export const {addWinningRecord, finalizeWinningRecordTime} = recordsSlice.actions;
export default recordsSlice.reducer;
