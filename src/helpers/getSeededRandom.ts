import {CoordinatesType} from "./pathFinder.ts";

function generateCustomHash() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Frequency table: [weight, length]
    const lengthWeights: CoordinatesType[] = [
        [52, 1],
        [486, 2],
        [1410, 3],
        [3882, 4],
        [7471, 5],
        [12453, 6],
        [16656, 7],
        [18204, 8],
        [16950, 9],
        [14088, 10],
        [10702, 11],
        [7226, 12],
    ];

    // Compute total weight
    const totalWeight = lengthWeights.reduce((sum, [w]) => sum + w, 0);

    // Pick a random length based on weights
    let r = Math.random() * totalWeight;
    let length = 1;
    for (const [weight, len] of lengthWeights) {
        if (r < weight) {
            length = len;
            break;
        }
        r -= weight;
    }

    // Build the hash
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function stringToSeed(str: string) {
    let h = 2166136261 >>> 0; // FNV-1a hash base
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

function lcgAdvance(a: number, c: number, m: number, seed: number, step: number): number {
    let aMul = 1n;
    let cMul = 0n;
    let aPow = BigInt(a);
    let cPow = BigInt(c);
    let bigM = BigInt(m);

    let k = BigInt(step);

    while (k > 0n) {
        if (k & 1n) {
            aMul = (aMul * aPow) % bigM;
            cMul = (cMul * aPow + cPow) % bigM;
        }
        cPow = (cPow * (aPow + 1n)) % bigM;
        aPow = (aPow * aPow) % bigM;
        k >>= 1n;
    }

    return Number((aMul * BigInt(seed) + cMul) % bigM);
}

export type PseudoRandomResult = {
    hash: string;
    step: number;
    value: number;
}

export function getSeededRandom(
    hash?: string,
    step: number = 0
): PseudoRandomResult {
    const usedHash = (hash ? hash.toUpperCase() : generateCustomHash());

    const m = 0x100000000; // 2^32
    const a = 1664525;
    const c = 1013904223;

    let seed = stringToSeed(usedHash);

    // Proper jump
    seed = lcgAdvance(a, c, m, seed, step);

    // Next value
    seed = (a * seed + c) % m;

    return {
        hash: usedHash,
        value: seed / m,
        step: ++step,
    };
}
