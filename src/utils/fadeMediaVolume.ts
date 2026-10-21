export const fadeMediaVolume = (
    media: Pick<HTMLMediaElement, "volume">,
    targetVolume: number,
    durationMs: number,
): (() => void) => {
    const target = Math.min(1, Math.max(0, targetVolume));
    const initial = media.volume;
    const startedAt = performance.now();
    let frame = 0;

    if (durationMs <= 0 || initial === target) {
        media.volume = target;
        return () => undefined;
    }

    const update = (now: number) => {
        const progress = Math.min(1, Math.max(0, (now - startedAt) / durationMs));
        media.volume = initial + (target - initial) * progress;
        if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frame);
};
