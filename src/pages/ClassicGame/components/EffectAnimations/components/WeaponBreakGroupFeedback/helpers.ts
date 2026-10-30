// Pause for 300ms, then finish all cracks within the following 200ms.
export const getWeaponBreakTiming = (index: number, count: number) => ({
    startDelayMs: 300 + (count <= 1 ? 0 : Math.round(index / (count - 1) * 120)),
    crackDurationMs: 80,
});
