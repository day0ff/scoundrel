import {treasureDungeonRoom} from "./treasure.ts";
import {roomDungeonRoom} from "./room.ts";
import {royalDungeonRoom} from "./royal.ts";
import {monsterDungeonRoom} from "./monster.ts";
import type {DungeonRoomDataType, DungeonRoomDangerType} from "./types.ts";

// Exclusive upper bounds for the sum of enemy ranks, ordered from low to high danger.
export const DUNGEON_ROOM_DANGER_THRESHOLDS = {
    easy: 22,
    normal: 29,
    hard: Infinity,
} as const satisfies Record<DungeonRoomDangerType, number>;

export const DUNGEON_ROOMS_MAP = {
    [treasureDungeonRoom.identifier]: treasureDungeonRoom,
    [roomDungeonRoom.identifier]: roomDungeonRoom,
    [royalDungeonRoom.identifier]: royalDungeonRoom,
    [monsterDungeonRoom.identifier]: monsterDungeonRoom,
} as const satisfies Record<DungeonRoomDataType["identifier"], DungeonRoomDataType>;
