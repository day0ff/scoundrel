import {BASE_URL} from "constants.ts";
import type {DungeonRoomDataType} from "./types.ts";

export const monsterDungeonRoom = {
    identifier: "day0ff:dungeonRoom-monster",
    kind: "monster",
    name: "dungeonRoom.monster.name",
    description: "dungeonRoom.monster.description",
    icon: `${BASE_URL}/images/interface/dungeon-rooms/insane.png`,
} as const satisfies DungeonRoomDataType<"monster">;
