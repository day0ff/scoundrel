export const moneyFormatNumber = (num: number, threshold: number): string => {
    if (Math.abs(num) < threshold) {
        const normalFormatter = new Intl.NumberFormat("de-DE", {
            useGrouping: true,
            maximumFractionDigits: 0,
        });
        return normalFormatter.format(num);
    }

    const compactFormatter = new Intl.NumberFormat("en-EN", {
        notation: "compact",
        useGrouping: true,
        maximumFractionDigits: 2,
    });

    return compactFormatter.format(num).replaceAll('.', ',');
}
