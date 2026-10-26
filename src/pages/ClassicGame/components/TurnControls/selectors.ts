import {canEndRoom, canSkipRoom} from "store/features/game/helpers.ts";
import type {RootState} from "store/types.ts";

export const canEndRoomSelector = (state: RootState) => !!state.game && canEndRoom(state.game);
export const canSkipRoomSelector = (state: RootState) => !!state.game && canSkipRoom(state.game);
export const showEndTurnSelector = (state: RootState) =>
    !!state.game && (!!state.game.roomProgress?.fightStarted || state.game.zones.room.cards.length === 0);
