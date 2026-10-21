import {canEndRoom, canSkipRoom} from "store/features/classic-game/helpers.ts";
import type {RootState} from "store/types.ts";

export const canEndRoomSelector = (state: RootState) => !!state.classicGame && canEndRoom(state.classicGame);
export const canSkipRoomSelector = (state: RootState) => !!state.classicGame && canSkipRoom(state.classicGame);
export const showEndTurnSelector = (state: RootState) =>
    !!state.classicGame && (!!state.classicGame.roomProgress?.fightStarted || state.classicGame.zones.room.cards.length === 0);
