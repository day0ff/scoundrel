import type {AnimationDataType} from "./types.ts";

// Playback completion controls the actual duration of this event.
export const soundAnimation = {
    identifier: "day0ff:animation-sound",
    name: "animation.sound.name",
    description: "animation.sound.description",
    durationMs: 1000,
    color: "whitesmoke",
} satisfies AnimationDataType<"sound">;
