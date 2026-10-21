import type {AnimationDataType} from "./types.ts";

export const attackAnimation = {
    identifier: "day0ff:animation-attack",
    name: "animation.attack.name",
    description: "animation.attack.description",
    durationMs: 900,
    color: "#f08060",
} satisfies AnimationDataType<"attack">;
