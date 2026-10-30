/** Animate the pixel border itself, restoring its normal color when cancelled. */
export const animateCardBorder = (card: HTMLElement | null | undefined, duration: number, color: string): Animation[] => {
    if (!card) return [];
    return Array.from(card.querySelectorAll<HTMLElement>("[data-pixel-card]"))
        .map(border => border.animate(
            [{backgroundColor: color}, {backgroundColor: color}],
            {duration, pseudoElement: "::after", fill: "both"},
        ));
};
