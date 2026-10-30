import type {SoundAnimationEventType, WeaponBreakAnimationEventType} from "entities/animations/types.ts";

export type WeaponBreakGroupFeedbackPropsType = {
    event: SoundAnimationEventType;
    breaks: WeaponBreakAnimationEventType[];
};
