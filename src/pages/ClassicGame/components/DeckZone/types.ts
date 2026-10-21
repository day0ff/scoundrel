import type {ReactNode} from "react";
import type {ZoneType} from "store/features/classic-game/types.ts";
import type {DeckPropsType} from "components/Deck/types.ts";

export type DeckZonePropsType = {
    zone: ZoneType;
    label: string;
    name: string;
    description: string;
    children?: ReactNode;
} & Partial<Pick<DeckPropsType, "image" | "overlayColor" | "repeatEvery" | "direction">>;
