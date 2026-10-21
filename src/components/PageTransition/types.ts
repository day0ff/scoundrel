export type PageTransitionPropsType = {
    /** Close and hold the curtains when true; reopen them when false. */
    active: boolean;
    /** Called when the curtains begin moving inward. */
    onClosing?: (durationMs: number) => void;
    /** Called once the curtains are closed and the card has finished flipping to its face. */
    onCovered?: () => void;
    /** Called after the reverse card animation, when the curtains begin moving outward. */
    onOpening?: (durationMs: number) => void;
    /** Called once the curtains have reopened completely. */
    onOpened?: () => void;
};

export type PageTransitionPhaseType = "idle" | "preparing" | "closing" | "covered" | "opening";

export type CurtainCornerType = "top-left" | "top-right" | "bottom-left" | "bottom-right";
