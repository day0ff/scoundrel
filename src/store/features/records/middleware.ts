import {createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import type {RootState} from "store/types.ts";
import {advancePhase, attackCard, endTurn, moveCard, playCard, setTime, startGame} from "store/features/classic-game";
import {calculateGameScore} from "store/features/classic-game/score.ts";
import {currentProfileNameSelector} from "store/features/profiles/selectors.ts";
import {addWinningRecord, finalizeWinningRecordTime} from "./index.ts";

export const recordsListenerMiddleware = createListenerMiddleware();

recordsListenerMiddleware.startListening({
    matcher: isAnyOf(advancePhase, attackCard, endTurn, moveCard, playCard, startGame, setTime),
    effect: (action, api) => {
        const before = (api.getOriginalState() as RootState).classicGame;
        const state = api.getState() as RootState;
        const game = state.classicGame;
        if (!game || game.outcome !== "victory") return;

        if (before?.outcome !== "victory") {
            api.dispatch(addWinningRecord({
                gameType: "classic-game",
                record: {
                    playerName: currentProfileNameSelector(state) ?? "",
                    score: calculateGameScore(game),
                    time: game.time,
                },
            }));
        } else if (setTime.match(action) && before.time !== game.time) {
            // The running timer flushes its final elapsed time when victory stops play.
            api.dispatch(finalizeWinningRecordTime({gameType: "classic-game", time: game.time}));
        }
    },
});
