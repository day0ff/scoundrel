import type {ZoneKindType} from "store/features/classic-game/types.ts";

export type EmptyCardSlotPropsType = {
    zoneType: ZoneKindType;
    index: number;
    label: string;
    canDrop: boolean;
    color: string;
};
