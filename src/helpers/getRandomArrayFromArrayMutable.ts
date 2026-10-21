import {getIntegerRandom} from "./getIntegerRandom.ts";

export const getRandomArrayFromArrayMutable = <T>(mutableArray: Array<T>, number: number, randomFunction?: () => number): Array<T> => {
    const newArray = [];

    for (let i = 0; i < number; i++) {
        const index = getIntegerRandom(0, mutableArray.length - 1, randomFunction);
        const [value] = mutableArray.splice(index, 1);

        if (value) newArray.push(value);
    }

    return newArray;
}