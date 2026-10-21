import type {AnimationDataType} from "./types.ts";

type HealAnimationDataType = AnimationDataType<"heal">;

export const healAnimation = {
    identifier: "day0ff:animation-heal",
    name: "animation.heal.name",
    description: "animation.heal.description",
    durationMs: 2000,
    color: "#a0d56c",
} satisfies HealAnimationDataType;
