export const scoreFormatNumber =(num: number, threshold: number): string => {
    if (Math.abs(num) < threshold) {
        // Normal number with grouping separators and max 2 decimals
        const normalFormatter = new Intl.NumberFormat("de-DE", {
            useGrouping: true,
            maximumFractionDigits: 0,
        });
        return normalFormatter.format(num);
    }

    // Scientific notation
    const sciFormatter = new Intl.NumberFormat("de-DE", {
        notation: "scientific",
        maximumFractionDigits: 2,
        maximumSignificantDigits: 3,
    });

    const formatted = sciFormatter.format(num); // "1.23E9"
    const match = formatted.match(/^([\d.,+-]+)E([+-]?\d+)$/);

    if (!match) return formatted;

    const [, coeff, exp] = match;
    return `${coeff}×10^${exp}`;
}
