import {createSelector} from "@reduxjs/toolkit";
import {classicGameSelector} from "store/features/classic-game/selectors.ts";
import {calculateGameScore} from "store/features/classic-game/score.ts";

export const gameResultScoreSelector = createSelector(classicGameSelector, game => game?.scoreRange ? {
    ...game.scoreRange,
    score: calculateGameScore(game),
} : undefined);
