export type BoundsType = {
    x: number,
    y: number,
    width: number,
    height: number
};

export const isIntersectingByThreshold = (rect1: BoundsType | undefined, rect2: BoundsType, threshold = 0.7): boolean => {
    if (!rect1) return false;
    // Define boundaries for rect1
    const rect1Left = rect1.x;
    const rect1Right = rect1.x + rect1.width;
    const rect1Top = rect1.y;
    const rect1Bottom = rect1.y + rect1.height;

    // Define boundaries for rect2
    const rect2Left = rect2.x;
    const rect2Right = rect2.x + rect2.width;
    const rect2Top = rect2.y;
    const rect2Bottom = rect2.y + rect2.height;

    // Calculate intersection boundaries
    const intersectLeft = Math.max(rect1Left, rect2Left);
    const intersectRight = Math.min(rect1Right, rect2Right);
    const intersectTop = Math.max(rect1Top, rect2Top);
    const intersectBottom = Math.min(rect1Bottom, rect2Bottom);

    // Calculate intersection dimensions
    const intersectWidth = Math.max(0, intersectRight - intersectLeft);
    const intersectHeight = Math.max(0, intersectBottom - intersectTop);

    // If there's no intersection, return false
    if (intersectWidth === 0 || intersectHeight === 0) {
        return false;
    }

    const intersectionArea = intersectWidth * intersectHeight;
    const area1 = rect1.width * rect1.height;
    const intersectionPercentage = intersectionArea / area1;

    return intersectionPercentage >= threshold;
}
