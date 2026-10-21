import {createSelector} from "@reduxjs/toolkit";
import type {RootState} from "../../types.ts";
import {DialogStateType} from "./types.ts";

export const dialogSelector = createSelector((state: RootState) => state, (state: RootState): DialogStateType => state.dialog);
