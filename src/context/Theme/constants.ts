export const breakpoints = {
    mobile: 480,
    tablet: 768,
    laptop: 1024,
    desktop: 1200,
} as const;

export const media = {
    mobile: `(max-width: ${breakpoints.mobile}px)`,
    tablet: `(max-width: ${breakpoints.tablet}px)`,
    laptop: `(max-width: ${breakpoints.laptop}px)`,
    desktop: `(max-width: ${breakpoints.desktop}px)`,
    tv: `(min-width: ${breakpoints.desktop + 1}px)`,
} as const;
