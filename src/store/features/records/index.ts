import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {classicPack} from "entities/packs/classic.ts";
import type {PackIdentifierType} from "entities/packs/types.ts";
import type {RecordGameType, RecordsStateType, WinningRecordType} from "./types.ts";

const initialState: RecordsStateType = [{
    gameType: "classic",
    packIdentifier: classicPack.identifier,
    records: [{playerName: "Scoundrel", score: 1, time: "01:07:00"}],
}];

const recordsSlice = createSlice({
    name: "records",
    initialState,
    reducers: {
        addWinningRecord: (state, {payload}: PayloadAction<{gameType: RecordGameType; packIdentifier: PackIdentifierType; record: WinningRecordType}>) => {
            const group = state.find(item => item.gameType === payload.gameType && item.packIdentifier === payload.packIdentifier);
            if (group) group.records.push(payload.record);
            else state.push({gameType: payload.gameType, packIdentifier: payload.packIdentifier, records: [payload.record]});
        },
        finalizeWinningRecordTime: (state, {payload}: PayloadAction<{gameType: RecordGameType; packIdentifier: PackIdentifierType; time: string}>) => {
            const record = state.find(item => item.gameType === payload.gameType && item.packIdentifier === payload.packIdentifier)?.records.at(-1);
            if (record) record.time = payload.time;
        },
    },
});

export const {addWinningRecord, finalizeWinningRecordTime} = recordsSlice.actions;
export default recordsSlice.reducer;
