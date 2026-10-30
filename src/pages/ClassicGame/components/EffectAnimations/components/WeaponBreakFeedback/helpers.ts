export const getBrokenWeaponPose = (side: number) => `translate(${side * 6}px, ${side * 8}px) rotate(${side * 5}deg)`;

export const getWeaponBreakFrames = (side: number, reduced: boolean): Keyframe[] => [
    {offset: 0, transform: "translate(0, 0) rotate(0deg)", filter: "brightness(1)"},
    {offset: 0.12, transform: reduced ? "none" : `translate(${side * 2}px, 0) rotate(${side}deg)`, filter: "brightness(1.6)"},
    {offset: 0.24, transform: reduced ? "none" : `translate(${-side * 3}px, 0) rotate(${-side * 2}deg)`, filter: "brightness(1.2)"},
    {offset: 0.55, transform: reduced ? "none" : getBrokenWeaponPose(side), filter: "brightness(0.8)"},
    {offset: 1, transform: reduced ? "none" : getBrokenWeaponPose(side), filter: "brightness(0.8)"},
];

export const getWeaponCryptFlightFrames = (
    origin: DOMRect,
    destination: DOMRect | undefined,
    side: number,
    reduced: boolean,
): Keyframe[] => [
    {transform: reduced ? "none" : getBrokenWeaponPose(side), opacity: 1},
    {
        transform: reduced || !destination ? "none"
            : `translate(${destination.left + destination.width / 2 - origin.left - origin.width / 2}px, ${destination.top + destination.height / 2 - origin.top - origin.height / 2}px) scale(0.15) rotate(${side * 20}deg)`,
        opacity: 0,
    },
];
