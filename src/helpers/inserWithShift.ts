import {findNearestFreeIndex} from "./findNearestFreeIndex.ts";

export const insertWithShift = <T extends Record<string, any>>(
    arr: T[],
    prop: keyof T,
    startIndex: number,
    newItem: NonNullable<T[typeof prop]>
): number | null => {
    const freeIndex = findNearestFreeIndex(arr, prop, startIndex);

    if (freeIndex === -1) return null;

    if (freeIndex === startIndex) {
        arr[startIndex][prop] = newItem;

        return startIndex;
    }

    if (freeIndex < startIndex) {
        for (let i = freeIndex; i < startIndex; i++) {
            arr[i][prop] = arr[i + 1][prop];
        }
    } else {
        for (let i = freeIndex; i > startIndex; i--) {
            arr[i][prop] = arr[i - 1][prop];
        }
    }

    arr[startIndex][prop] = newItem;

    return startIndex;
}
