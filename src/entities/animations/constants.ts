import {callAnimation} from "./call.ts";
import {hatchAnimation} from "./hatch.ts";
import {drainAnimation} from "./drain.ts";
import {attackAnimation} from "./attack.ts";
import {healAnimation} from "./heal.ts";
import {consumeAnimation} from "./consume.ts";
import {summonAnimation} from "./summon.ts";
import type {AnimationDataType} from "./types.ts";

export const ANIMATIONS_MAP = {
    [callAnimation.identifier]: callAnimation,
    [hatchAnimation.identifier]: hatchAnimation,
    [drainAnimation.identifier]: drainAnimation,
    [healAnimation.identifier]: healAnimation,
    [attackAnimation.identifier]: attackAnimation,
    [consumeAnimation.identifier]: consumeAnimation,
    [summonAnimation.identifier]: summonAnimation,
} as const satisfies Record<AnimationDataType<"heal" | "attack" | "consume" | "summon" | "drain" | "hatch" | "call">["identifier"], AnimationDataType<"heal" | "attack" | "consume" | "summon" | "drain" | "hatch" | "call">>;

export const initAnimations = Object.values(ANIMATIONS_MAP);
