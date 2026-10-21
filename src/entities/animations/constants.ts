import {attackAnimation} from "./attack.ts";
import {healAnimation} from "./heal.ts";
import type {AnimationDataType} from "./types.ts";

export const ANIMATIONS_MAP = {
    [healAnimation.identifier]: healAnimation,
    [attackAnimation.identifier]: attackAnimation,
} as const satisfies Record<AnimationDataType<"heal" | "attack">["identifier"], AnimationDataType<"heal" | "attack">>;

export const initAnimations = Object.values(ANIMATIONS_MAP);
