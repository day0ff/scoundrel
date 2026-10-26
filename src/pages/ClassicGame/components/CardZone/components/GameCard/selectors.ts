import {createSelector} from "@reduxjs/toolkit";
import {classicGameSelector} from "store/features/classic-game/selectors.ts";

export const pendingAttacksSelector = createSelector(
    classicGameSelector,
    game => game?.animationEvents.filter(event => event.animation === "day0ff:animation-attack") ?? [],
);

export const firstAttackerIdSelector = createSelector(
    classicGameSelector,
    game => {
        const cards = game?.zones.weapons.cards;
        return (cards?.find(card => card.role === "weapon")
            ?? cards?.find(card => card.role === "fist" && card.identifier === "day0ff:pasteboard-fist.0"))?.id;
    },
);
