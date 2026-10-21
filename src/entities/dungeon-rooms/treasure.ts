import {BASE_URL} from "constants.ts";
import type {DungeonRoomDataType} from "./types.ts";

export const treasureDungeonRoom = {
    identifier: "day0ff:dungeonRoom-treasure",
    kind: "treasure",
    name: "dungeonRoom.treasure.name",
    description: "dungeonRoom.treasure.description",
    icon: `${BASE_URL}/images/interface/dungeon-rooms/treasure.png`,
} as const satisfies DungeonRoomDataType<"treasure">;
