export type DeckPropsType = {
    name: string;
    description: string;
    image: string;
    overlayColor?: string;
    count: number;
    label: string;
    onClick?: () => void;
    /** Cards represented by each layer. Set false to disable repetition. */
    repeatEvery?: number | false;
    /** Horizontal direction in which the top cards are shifted. */
    direction?: "right" | "left";
};
