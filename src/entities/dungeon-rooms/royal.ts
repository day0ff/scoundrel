import {BASE_URL} from "constants.ts";
import type {DungeonRoomDataType} from "./types.ts";

export const royalDungeonRoom = {
    identifier: "day0ff:dungeonRoom-royal",
    kind: "royal",
    name: "dungeonRoom.royal.name",
    description: "dungeonRoom.royal.description",
    icon: `${BASE_URL}/images/interface/dungeon-rooms/royal.png`,
} as const satisfies DungeonRoomDataType<"royal">;
