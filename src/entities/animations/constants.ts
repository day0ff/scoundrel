import {attackAnimation} from "./attack.ts";
import {healAnimation} from "./heal.ts";
import {consumeAnimation} from "./consume.ts";
import {summonAnimation} from "./summon.ts";
import type {AnimationDataType} from "./types.ts";

export const ANIMATIONS_MAP = {
    [healAnimation.identifier]: healAnimation,
    [attackAnimation.identifier]: attackAnimation,
    [consumeAnimation.identifier]: consumeAnimation,
    [summonAnimation.identifier]: summonAnimation,
} as const satisfies Record<AnimationDataType<"heal" | "attack" | "consume" | "summon">["identifier"], AnimationDataType<"heal" | "attack" | "consume" | "summon">>;

export const initAnimations = Object.values(ANIMATIONS_MAP);
