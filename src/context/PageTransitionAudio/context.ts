import {createContext} from "react";
import type {PageTransitionAudioType} from "./types.ts";

export const PageTransitionAudioContext = createContext<PageTransitionAudioType>({
    gain: 1,
    durationMs: 0,
});
