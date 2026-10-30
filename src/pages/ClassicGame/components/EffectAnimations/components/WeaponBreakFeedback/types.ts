import type {WeaponBreakAnimationEventType} from "entities/animations/types.ts";

export type WeaponBreakFeedbackPropsType = {
    event: WeaponBreakAnimationEventType;
    duration: number;
    startDelayMs?: number;
    crackDurationMs?: number;
    onComplete?: (id: number) => void;
};
