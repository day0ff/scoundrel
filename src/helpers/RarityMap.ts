import {RarityTypes} from "entities/constants.ts";
import {RarityType} from "entities/types.ts";
import {getIntegerRandom} from "./getIntegerRandom.ts";

export type RarityBaseType = { rarity: RarityType };

type RarityRange = { start: number; end: number; rarity: RarityType };

const initialStart = 1;

const initialRangesRarityMap = () => Object.values(RarityTypes).reduce((acc, rarity) => {
    acc[rarity] = [];

    return acc;
}, {} as Record<RarityType, Array<any>>);


export class RarityMap<T extends RarityBaseType> {
    protected range = {
        start: 1,
        end: initialStart - 1,
    };
    protected itemsByRarityMap: Record<RarityType, Array<T>> = initialRangesRarityMap();
    protected rarityRangesMap: Array<RarityRange> = [];
    protected random = Math.random;

    constructor(items: Array<T>, randomFunction?: () => number) {
        if (randomFunction) this.random = randomFunction;

        items.forEach((item) => {
            const {rarity} = item;

            if (Number(rarity) <= 0) return;

            this.itemsByRarityMap[rarity].push(item);
        });

        this.reRangeMaps();
    }

    add(item: T) {
        const {rarity} = item;

        this.itemsByRarityMap[rarity].push(item);

        this.reRangeMaps();
    }

    getRange() {
        return this.range;
    }

    private reRangeMaps() {
        const rarityRangesMap: Array<RarityRange> = [];
        let currentStart = initialStart;

        Object.entries(this.itemsByRarityMap).forEach(([rarity, value]) => {
            if (!value.length) return;

            const index = rarityRangesMap.findIndex((item) => String(item.rarity) === String(rarity));

            if (index !== -1) return;

            const item = {
                start: currentStart,
                end: Number(rarity) + currentStart - 1,
                rarity: Number(rarity),
            }

            currentStart += Number(rarity);

            // @ts-ignore
            rarityRangesMap.push(item)
        });

        this.rarityRangesMap = rarityRangesMap;
        this.range.end = currentStart - 1;
    }

    removeItemByIndex(rarity: RarityType, index: number) {
        this.itemsByRarityMap[rarity]?.splice(index, 1);

        this.reRangeMaps();
    }

    removeItem(rarity: RarityType, item: T) {
        const index = this.itemsByRarityMap[rarity]?.indexOf(item);

        this.removeItemByIndex(rarity, index);
    }

    getItems() {
        return this.itemsByRarityMap;
    }

    protected getItemsByRarity(rarity: RarityType) {
        return this.itemsByRarityMap[rarity];
    }


    getRarityRanges() {
        return this.rarityRangesMap;
    }

    protected getRarityTypeFromRange(num: number): RarityType {
        let low = 0, high = this.rarityRangesMap.length - 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const range = this.rarityRangesMap[mid];

            if (num < range.start) {
                high = mid - 1;
            } else if (num >= range.end) {
                low = mid + 1;
            } else {
                return range.rarity;
            }
        }

        return this.rarityRangesMap[0]?.rarity;
    }

    getRandomItemByRarity(rarity: RarityType, randomFunction?: () => number) {
        const items = this.getItemsByRarity(rarity) ?? [];
        const index = getIntegerRandom(0, items.length - 1, randomFunction ?? this.random);

        return items[index];
    }

    getRandomItemAndRarity(randomFunction?: () => number) {
        const {start, end} = this.range;

        const num = getIntegerRandom(start, end, randomFunction ?? this.random);
        const rarity = this.getRarityTypeFromRange(num);
        const item = this.getRandomItemByRarity(rarity);

        return {item, rarity};
    }

    getRandomItem(randomFunction?: () => number) {
        const {item} = this.getRandomItemAndRarity(randomFunction);

        return item;
    }

    getRandomArray(length: number, randomFunction?: () => number) {
        return Array.from({length}, () => this.getRandomItem(randomFunction)).filter(r => !!r);
    }

    getUniqueRandomArray(length: number, randomFunction?: () => number) {
        return Array.from({length}, () => {
            const {item, rarity} = this.getRandomItemAndRarity(randomFunction);

            this.removeItem(rarity, item);

            return item;
        }).filter(r => !!r);
    }
}