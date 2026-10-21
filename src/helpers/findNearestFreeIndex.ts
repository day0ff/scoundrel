export const findNearestFreeIndex =  <T extends Record<string, any>>(
    arr: Array<T>,
    prop: keyof T,
    startIndex: number
): number => {
    if (arr[startIndex]?.[prop] === null) {
        return startIndex;
    }

    const len = arr.length;

    for (let offset = 1; offset < len; offset++) {
        const left = startIndex - offset;
        const right = startIndex + offset;

        if (left >= 0 && arr[left][prop] === null) return left;
        if (right < len && arr[right][prop] === null) return right;
    }

    return -1;
}