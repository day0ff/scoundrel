import {getIntegerRandom} from "./getIntegerRandom.ts";

export const extractItemsToNewArray = <T>(initialArray: Array<T>, quantity: number): [Array<T>, Array<T>] => {
    const oldArray = [...initialArray];
    const newArray = [];

    for (let i = 0; i < quantity; i++) {
        const index = getIntegerRandom(0, oldArray.length - 1);
        const [value] = oldArray.splice(index, 1);

        if (value) newArray.push(value);
    }

    return [newArray, oldArray];
}