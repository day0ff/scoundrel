import type {RoomZoneType} from "store/features/classic-game/types.ts";
import type {CardZonePropsType} from "../CardZone/types.ts";

export type RoomZonePropsType = Pick<CardZonePropsType, "appendTo" | "onAttack" | "previewEnemyId"> & {
    zone: RoomZoneType;
    onTransitionChange: (busy: boolean) => void;
};
