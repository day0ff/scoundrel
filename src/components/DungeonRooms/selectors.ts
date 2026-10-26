import {createSelector} from "@reduxjs/toolkit";
import {gameSelector} from "store/features/game/selectors.ts";
import {getDungeonRooms} from "entities/dungeon-rooms/helpers.ts";

export const dungeonRoomsSelector = createSelector(gameSelector, game => game ? getDungeonRooms(game) : []);
