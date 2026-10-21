import {BASE_URL} from "constants.ts";
import type {DungeonRoomDataType} from "./types.ts";

export const roomDungeonRoom = {
    identifier: "day0ff:dungeonRoom-room",
    kind: "room",
    name: "dungeonRoom.room.name",
    description: "dungeonRoom.room.description",
    icon: `${BASE_URL}/images/interface/dungeon-rooms/door.png`,
} as const satisfies DungeonRoomDataType<"room">;
