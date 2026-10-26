import {createSelector} from "@reduxjs/toolkit";
import {gameSelector} from "store/features/game/selectors.ts";
import {calculateGameScore} from "store/features/game/score.ts";

export const gameResultScoreSelector = createSelector(gameSelector, game => game?.scoreRange ? {
    ...game.scoreRange,
    score: calculateGameScore(game),
} : undefined);
