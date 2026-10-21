import {zeroFistPasteboardCard} from "entities/cards/pasteboard/fist/0.ts";
import type {FistPasteboardDataType} from "./types.ts";

export const zeroFistPasteboard = {
    identifier: "day0ff:pasteboard-fist.0",
    name: "pasteboard.fist.0.name",
    description: "pasteboard.fist.0.description",
    card: zeroFistPasteboardCard,
    suit: "fist",
    role: "fist",
    rank: "0",
    isLocked: false,
    isNotFound: false,
} as const satisfies FistPasteboardDataType<"0">;
