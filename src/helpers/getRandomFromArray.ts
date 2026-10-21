import {getIntegerRandom} from "./getIntegerRandom";

export const getRandomFromArray = <T,>(arr: T[]) => {
    const index = getIntegerRandom(0, arr.length - 1);

    return arr[index];
}