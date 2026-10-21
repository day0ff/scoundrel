import type {DungeonRoomDangerType} from "entities/dungeon-rooms/types.ts";

export const DUNGEON_ROOM_GLOW_COLORS = {
    easy: "#59df79",
    normal: "#ffad42",
    hard: "#ff4d57",
} as const satisfies Record<DungeonRoomDangerType, string>;
