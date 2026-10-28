import {treasureDungeonRoom} from "./treasure.ts";
import {roomDungeonRoom} from "./room.ts";
import {royalDungeonRoom} from "./royal.ts";
import {monsterDungeonRoom} from "./monster.ts";
import {DUNGEON_ROOM_DANGER_THRESHOLDS} from "./constants.ts";
import {getEncounterStrength} from "entities/pasteboards/encounters.ts";
import type {GameStateType, PlayingCardType} from "entities/game/types.ts";
import type {DungeonRoomDangerType, DungeonRoomType} from "./types.ts";

export const classifyDungeonRoom = (cards: PlayingCardType[], status: DungeonRoomType["status"] = "upcoming"): DungeonRoomType => {
    const enemies = cards.filter(card => card.role === "enemy");
    const royals = enemies.filter(card => ["J", "Q", "K", "A"].includes(card.rank)).length;
    const strength = enemies.reduce((sum, card) => sum + getEncounterStrength(card), 0);
    const danger = (Object.keys(DUNGEON_ROOM_DANGER_THRESHOLDS) as DungeonRoomDangerType[])
        .find(level => strength < DUNGEON_ROOM_DANGER_THRESHOLDS[level]);
    return {
        ...(enemies.length === 0 ? treasureDungeonRoom : enemies.length === 1 ? roomDungeonRoom : royals >= 2 ? monsterDungeonRoom : royals === 1 ? royalDungeonRoom : roomDungeonRoom),
        danger: enemies.length === 0 ? undefined : danger,
        strength, enemies: enemies.length, status,
    };
};

export const getDungeonRooms = (game: GameStateType): DungeonRoomType[] => {
    const rooms = (game.completedRooms ?? []).map(cards => classifyDungeonRoom(cards, "completed"));
    const active = game.activeRoomCards ?? game.zones.room.cards;
    if (active.length && game.started !== false) rooms.push(classifyDungeonRoom(active, !game.zones.room.cards.length && !game.zones.dungeon.cards.length ? "completed" : "current"));
    const capacity = game.zones.room.capacity;
    if (!Number.isSafeInteger(capacity) || capacity <= 0) return rooms;
    for (let index = 0; index < game.zones.dungeon.cards.length;) {
        const size = index === 0 && game.started === false ? Math.max(1, capacity - game.zones.room.cards.length) : capacity;
        const cards = game.zones.dungeon.cards.slice(index, index + size);
        rooms.push(classifyDungeonRoom(index === 0 && game.started === false ? [...game.zones.room.cards, ...cards] : cards));
        index += size;
    }
    return rooms;
};
