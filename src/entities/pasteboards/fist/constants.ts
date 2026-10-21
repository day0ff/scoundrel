import type {RankType} from "../../types.ts";
import type {FistPasteboardDataType} from "./types.ts";
import {zeroFistPasteboard} from "./0.ts";

export const PASTEBOARD_FIST_MAP = {
    "day0ff:pasteboard-fist.0": zeroFistPasteboard,
} as const satisfies Partial<Record<
    FistPasteboardDataType<RankType>["identifier"],
    FistPasteboardDataType<RankType>
>>;

export const allFistPasteBoards = Object.values(PASTEBOARD_FIST_MAP);
