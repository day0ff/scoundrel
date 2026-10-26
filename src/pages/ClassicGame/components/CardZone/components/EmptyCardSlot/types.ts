import type {ZoneKindType} from "entities/game/types.ts";

export type EmptyCardSlotPropsType = {
    zoneType: ZoneKindType;
    index: number;
    label: string;
    canDrop: boolean;
    color: string;
};
