import {getIntegerRandom} from "./getIntegerRandom.ts";

export const getRandomArrayFromArray = <T>(initialArray: Array<T>, number: number, randomFunction?: () => number): Array<T> => {
    const oldArray = [...initialArray];
    const newArray = [];

    for (let i = 0; i < number; i++) {
        const index = getIntegerRandom(0, oldArray.length - 1, randomFunction);
        const [value] = oldArray.splice(index, 1);

        if (value) newArray.push(value);
    }

    return newArray;
}