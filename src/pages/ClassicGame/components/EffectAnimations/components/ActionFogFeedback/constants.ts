export const FOG_FADE_MS = 900;

export const FOG_PARTICLES = Array.from({length: 32}, (_, index) => ({
    x: (index * 37 + 11) % 100,
    y: (index * 23 + 17) % 100,
    size: 8 + index % 6 * 3,
    drift: (index % 2 ? -1 : 1) * (25 + index % 7 * 10),
    duration: 3500 + index % 8 * 400,
    delay: -(index % 9) * 550,
}));
