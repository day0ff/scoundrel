import type {RoomZoneType} from "entities/game/types.ts";
import type {CardZonePropsType} from "../CardZone/types.ts";

export type RoomZonePropsType = Pick<CardZonePropsType, "appendTo" | "onAttack" | "previewEnemyId"> & {
    zone: RoomZoneType;
    onTransitionChange: (busy: boolean) => void;
};
