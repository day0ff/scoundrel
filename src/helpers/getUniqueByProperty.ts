export const getUniqueByProperty = <T extends object>(arr: Array<T | null>, prop: keyof T) => {
    const seen = new Set();

    return arr.filter(item => {
        if (!item) return false;

        const value = item[prop];

        if (seen.has(value)) {
            return false;
        }

        seen.add(value);

        return true;
    }) as Array<T>;
};