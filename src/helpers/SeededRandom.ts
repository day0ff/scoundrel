import {getSeededRandom} from "./getSeededRandom.ts";

export class SeededRandom {
    private hash: string = '';
    private step: number = 0;
    private value: number = 0;

    constructor(seed?: { hash?: string, step?: number }) {
        const newSeed = getSeededRandom(seed?.hash, seed?.step);

        this.setSeed(newSeed);
    }

    setSeed(seed: { hash: string, step: number; value: number;}) {
        this.hash = seed.hash;
        this.step = seed.step;
        this.value = seed.value;
    }

    getSeed() {
        return {
            hash: this.hash,
            step: this.step,
            value: this.value,
        };
    }

    random = () => {
        const seed = this.getSeed();
        const newSeed = getSeededRandom(seed.hash, seed.step);

        this.setSeed(newSeed);

        return newSeed.value;
    }
}