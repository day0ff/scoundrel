import {HandTypes} from "entities/constants.ts";
import {HandTypeType} from "entities/types.ts";

export type Die = "-1" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | string;

type DiceType = { id: string; side: Die };

/** Normalize:
 * - "-1" => wildcard
 * - "0"  => no die (ignored)
 * - "1"–"6" => faces
 */
const normalize = (dice: DiceType[]) => {
    const faces: number[] = [];
    let wild = 0;

    for (const d of dice) {
        if (d.side === "-1") wild++;
        else if (d.side !== "0") faces.push(Number(d.side));
    }

    return {faces, wild};
};

/** Count occurrences for face 1–6 */
const countFaces = (faces: number[]): number[] => {
    const counts = [0, 0, 0, 0, 0, 0, 0]; // indexes 1–6 used
    for (const f of faces) counts[f]++;
    return counts;
};
/** Pick dice objects for a given face and count, including wildcards */
const pickDiceForCount = (dice: DiceType[], target: number, count: number): DiceType[] => {
    const picked: DiceType[] = [];
    let wildUsed = 0;

    for (const d of dice) {
        if (picked.length >= count) break;
        if (d.side === target.toString()) picked.push(d);
        else if (d.side === "-1") {
            if (picked.length + wildUsed < count) {
                picked.push(d);
                wildUsed++;
            }
        }
    }

    return picked;
};

/** Detect straights and return dice objects */
const pickStraight = (dice: DiceType[], length: 4 | 5): DiceType[] | null => {
    const {wild} = normalize(dice);

    const sequences =
        length === 5
            ? [
                [1, 2, 3, 4, 5],
                [2, 3, 4, 5, 6],
            ]
            : [
                [1, 2, 3, 4],
                [2, 3, 4, 5],
                [3, 4, 5, 6],
            ];

    for (const seq of sequences) {
        let missing = 0;
        const selected: DiceType[] = [];
        const usedIds = new Set<string>();

        for (const face of seq) {
            const die = dice.find(d => !usedIds.has(d.id) && d.side === face.toString());
            if (die) {
                selected.push(die);
                usedIds.add(die.id);
            } else missing++;
        }

        if (missing <= wild) {
            // fill wildcards
            for (const d of dice) {
                if (selected.length >= length) break;
                if (!usedIds.has(d.id) && d.side === "-1") {
                    selected.push(d);
                    usedIds.add(d.id);
                }
            }
            return selected;
        }
    }

    return null;
};

/** Main function: returns hand type and the dice forming it */
export const getHandType = (
    dices: DiceType[]
): { type: HandTypeType; dices: DiceType[] } => {
    if (dices.every(d => d.side === "0")) return {type: HandTypes.NONE, dices: []};

    const {faces, wild} = normalize(dices);
    const counts = countFaces(faces);

    const sortedCounts = counts.slice(1).sort((a, b) => b - a);
    const top = sortedCounts[0];
    const second = sortedCounts[1] ?? 0;

    // POKER
    if (top + wild >= 5) {
        return {type: HandTypes.POKER, dices: pickDiceForCount(dices, counts.indexOf(top), 5)};
    }

    // QUADS
    if (top + wild >= 4) {
        return {type: HandTypes.QUADS, dices: pickDiceForCount(dices, counts.indexOf(top), 4)};
    }

    // STRAIGHTS
    const straight5 = pickStraight(dices, 5);
    if (straight5) return {type: HandTypes.STRAIGHT, dices: straight5};

    const straight4 = pickStraight(dices, 4);
    if (straight4) return {type: HandTypes.SMALL_STRAIGHT, dices: straight4};

    // FULL HOUSE
    const canThree = top + wild >= 3;
    const wildAfterThree = wild - Math.max(0, 3 - top);
    const canPair = second + Math.max(wildAfterThree, 0) >= 2;
    if (canThree && canPair) {
        const threeDice = pickDiceForCount(dices, counts.indexOf(top), 3);

        // find pair among remaining
        const remainingDice = dices.filter(d => !threeDice.includes(d));
        const secondFace = counts.indexOf(second);
        const pairDice = pickDiceForCount(remainingDice, secondFace, 2);

        return {type: HandTypes.FULL_HOUSE, dices: [...threeDice, ...pairDice]};
    }

    // SET
    if (top + wild >= 3) {
        return {type: HandTypes.SET, dices: pickDiceForCount(dices, counts.indexOf(top), 3)};
    }

    // TWO PAIR
    {
        const pairs: DiceType[] = [];
        let remainingWild = wild;
        for (let face = 1; face <= 6; face++) {
            const c = counts[face];
            if (c >= 2) pairs.push(...pickDiceForCount(dices, face, 2));
            else if (c === 1 && remainingWild > 0) {
                pairs.push(...pickDiceForCount(dices, face, 2));
                remainingWild--;
            }
        }
        if (pairs.length >= 4) return {type: HandTypes.TWO_PAIR, dices: pairs.slice(0, 4)};
    }

    // PAIR
    if (top + wild >= 2) {
        return {type: HandTypes.PAIR, dices: pickDiceForCount(dices, counts.indexOf(top), 2)};
    }

    // HIGH
    return {type: HandTypes.HIGH, dices: dices.filter(d => d.side !== "0")};
};