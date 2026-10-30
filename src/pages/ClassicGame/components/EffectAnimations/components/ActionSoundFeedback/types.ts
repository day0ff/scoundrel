import type {SoundAnimationEventType} from "entities/animations/types.ts";

export type ActionSoundFeedbackPropsType = {
    event: SoundAnimationEventType;
    onComplete?: (id: number) => void;
};
