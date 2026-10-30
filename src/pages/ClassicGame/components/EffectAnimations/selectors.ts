import {createSelector} from "@reduxjs/toolkit";
import {activeEffectAnimationGameSelector, zonesGameSelector} from "store/features/game/selectors.ts";

export const arrivingCardSelector = createSelector(
    activeEffectAnimationGameSelector,
    zonesGameSelector,
    (event, zones) => {
        const id = event?.animation === "day0ff:animation-hatch" ? event.hatchlingId
            : (event?.animation === "day0ff:animation-summon" || event?.animation === "day0ff:animation-call") ? event.summonedId : undefined;
        return id ? zones?.room.cards.find(card => card.id === id) : undefined;
    },
);
