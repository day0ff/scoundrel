export type BoundingRectType = {
    x: number,
    y: number,
    width: number,
    height: number,
    top: number,
    right: number,
    bottom: number,
    left: number
};

export const getSerializedBoundingRect = (element: HTMLElement | null | undefined): BoundingRectType => {
    if (!element) return {x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0};
    const {x, y, width, height, top, right, bottom, left} = element.getBoundingClientRect();

    return {x, y, width, height, top, right, bottom, left};
}