export const getCallFlightFrames = (
    rect: Pick<DOMRect, "left" | "top" | "width" | "height">,
    viewportWidth: number,
    source?: Pick<DOMRect, "left" | "top" | "width" | "height">,
): Keyframe[] => source ? [
    {
        offset: 0,
        transform: `translate(${source.left + source.width / 2 - rect.left - rect.width / 2}px, ${source.top + source.height / 2 - rect.top - rect.height / 2}px) scale(0.8) rotate(-12deg)`,
        opacity: 1,
    },
    {offset: 0.8, transform: "translate(0, -16px) scale(1.05) rotate(3deg)", opacity: 1},
    {offset: 1, transform: "translate(0, 0) scale(1) rotate(0deg)", opacity: 1},
] : [
    {
        offset: 0,
        transform: `translate(${viewportWidth - rect.left + rect.width * 2}px, ${-rect.top - rect.height * 2}px) scale(1.6) rotate(-18deg)`,
        filter: "drop-shadow(0 0 30px whitesmoke) drop-shadow(0 0 60px whitesmoke)",
        opacity: 0,
    },
    {
        offset: 0.18,
        transform: `translate(${viewportWidth - rect.left - rect.width}px, ${-rect.top + rect.height * 0.25}px) scale(1.4) rotate(-12deg)`,
        filter: "drop-shadow(0 0 24px whitesmoke) drop-shadow(0 0 48px whitesmoke)",
        opacity: 1,
    },
    {
        offset: 0.78,
        transform: "translate(-12px, -18px) scale(1.08) rotate(3deg)",
        filter: "drop-shadow(0 0 18px whitesmoke) drop-shadow(0 0 32px whitesmoke)",
        opacity: 1,
    },
    {
        offset: 1,
        transform: "translate(0, 0) scale(1) rotate(0deg)",
        filter: "drop-shadow(0 0 0 transparent) drop-shadow(0 0 0 transparent)",
        opacity: 1,
    },
];
