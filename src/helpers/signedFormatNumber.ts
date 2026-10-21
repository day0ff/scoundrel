export const signedFormatNumber = (number?: number | string): string => {
    const num = Number(number);

    if (isNaN(num)) return "0";

    switch (Math.sign(num)) {
        case 1: return `+${num}`;
        default: return `${num}`;
    }
}
