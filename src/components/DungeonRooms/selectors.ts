import {createSelector} from "@reduxjs/toolkit";
import {classicGameSelector} from "store/features/classic-game/selectors.ts";
import {getDungeonRooms} from "entities/dungeon-rooms/helpers.ts";

export const dungeonRoomsSelector = createSelector(classicGameSelector, game => game ? getDungeonRooms(game) : []);
