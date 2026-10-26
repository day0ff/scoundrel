import {createSelector} from "@reduxjs/toolkit";
import type {RootState} from "store/types.ts";
import {parseRaceTime} from "store/features/classic-game/time.ts";

export const recordsSelector = (state: RootState) => state.records;

export const rankedRecordsSelector = createSelector(recordsSelector, groups => groups.map(group => ({
    ...group,
    records: [...group.records].sort((left, right) => right.score - left.score
        || parseRaceTime(left.time) - parseRaceTime(right.time)),
})));
