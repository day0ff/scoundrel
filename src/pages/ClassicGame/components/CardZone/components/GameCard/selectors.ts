import {createSelector} from "@reduxjs/toolkit";
import {gameSelector} from "store/features/game/selectors.ts";

export const pendingAttacksSelector = createSelector(
    gameSelector,
    game => game?.animationEvents.filter(event => event.animation === "day0ff:animation-attack") ?? [],
);

export const firstAttackerIdSelector = createSelector(
    gameSelector,
    game => {
        const cards = game?.zones.weapons.cards;
        return (cards?.find(card => card.role === "weapon")
            ?? cards?.find(card => card.role === "fist" && card.identifier === "day0ff:pasteboard-fist.0"))?.id;
    },
);
