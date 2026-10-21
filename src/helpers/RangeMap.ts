import {getIntegerRandom} from "./getIntegerRandom.ts";

export class RangeMap<T> {
    private items: { weight: number; value: T }[] = [];
    private ranges: { start: number; end: number; value: T }[] = [];
    protected random = Math.random;

    constructor(items?: Array<{ weight: number; value: T }>, randomFunction?: () => number) {
        if (randomFunction) this.random = randomFunction;

        items?.forEach(({weight, value}) => {
            if(weight <= 0) return;

            this.add(weight, value)
        });
    }

    add(weight: number, value: T): void {
        if(weight <= 0) return;

        this.items.push({weight, value});
        this.rebuildRanges();
    }

    get(num: number): T | undefined {
        let low = 0, high = this.ranges.length - 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const range = this.ranges[mid];

            if (num < range.start) {
                high = mid - 1;
            } else if (num > range.end) {
                low = mid + 1;
            } else {
                return range.value;
            }
        }

        return undefined;
    }

    remove(num: number): { removed?: T; ranges: { start: number; end: number; value: T }[] } {
        // find range
        const idx = this.ranges.findIndex(r => num >= r.start && num <= r.end);

        if (idx === -1) {
            return {ranges: this.ranges};
        }

        const removedItem = this.items[idx];
        this.items.splice(idx, 1); // remove from items
        this.rebuildRanges(); // recalc all ranges

        return {removed: removedItem.value, ranges: this.ranges};
    }

    private rebuildRanges(): void {
        this.ranges = [];
        let currentStart = 1;
        for (const item of this.items) {
            const start = currentStart;
            const end = start + item.weight - 1;
            this.ranges.push({start, end, value: item.value});
            currentStart = end + 1;
        }
    }

    getRanges() {
        return this.ranges;
    }

    getRange() {
        const end = this.ranges.reduce((acc, {end}) => (acc > end ? acc : end), 0);

        return [1, end]
    }

    getRandom(random?: () => number) {
        const [start, end] = this.getRange();
        const num = getIntegerRandom(start, end, random ?? this.random);
        const value = this.get(num);

        return {
            num,
            value,
        };
    }

    getRandomValue(random?: () => number) {
        const [start, end] = this.getRange();
        const num = getIntegerRandom(start, end, random ?? this.random);

        return this.get(num);
    }

    getUniqueRandomArray(length: number, random?: () => number) {
        return Array.from({ length }, () => {
            const [start, end] = this.getRange();
            const num = getIntegerRandom(start, end, random ?? this.random);
            const {removed} = this.remove(num);

            return removed;
        }).filter(r => !!r);
    }
}
