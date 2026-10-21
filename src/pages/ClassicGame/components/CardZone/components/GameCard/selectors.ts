import {createSelector} from "@reduxjs/toolkit";
import {classicGameSelector} from "store/features/classic-game/selectors.ts";

export const pendingAttacksSelector = createSelector(
    classicGameSelector,
    game => game?.animationEvents.filter(event => event.animation === "day0ff:animation-attack") ?? [],
);
