import {healEffect} from "./heal.ts";
import type {EffectDataType} from "./types.ts";

export const EFFECTS_MAP = {
    [healEffect.identifier]: healEffect,
} as const satisfies Record<EffectDataType<"heal">["identifier"], EffectDataType<"heal">>;
