import {attackAnimation} from "./attack.ts";
import {healAnimation} from "./heal.ts";
import {consumeAnimation} from "./consume.ts";
import type {AnimationDataType} from "./types.ts";

export const ANIMATIONS_MAP = {
    [healAnimation.identifier]: healAnimation,
    [attackAnimation.identifier]: attackAnimation,
    [consumeAnimation.identifier]: consumeAnimation,
} as const satisfies Record<AnimationDataType<"heal" | "attack" | "consume">["identifier"], AnimationDataType<"heal" | "attack" | "consume">>;

export const initAnimations = Object.values(ANIMATIONS_MAP);
