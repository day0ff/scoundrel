export const sumMatrixArray = (arrayA: Array<number> | undefined, arrayB: Array<number> | undefined) => {
    if (!arrayA) return arrayB;
    if (!arrayB) return arrayA;

    return arrayA.map((item, index) => item + arrayB[index]);
};