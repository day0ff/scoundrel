import {createSelector} from "@reduxjs/toolkit";
import type {RootState} from "store/types.ts";
import type {ZoneKindType} from "entities/game/types.ts";
import {zonesGameSelector, cryptWithEffectFeedbackSelector} from "store/features/game/selectors.ts";
import {RANK_ORDER, SUIT_ORDER} from "./constants.ts";

export const zoneCardsSelector = createSelector(
    (state: RootState, zoneType: ZoneKindType) => (zoneType === "crypt" ? cryptWithEffectFeedbackSelector(state)?.cards : zonesGameSelector(state)?.[zoneType].cards) ?? [],
    (_state: RootState, zoneType: ZoneKindType) => zoneType,
    (cards, zoneType) => zoneType === "dungeon"
        ? [...cards].sort((first, second) => SUIT_ORDER.indexOf(first.suit) - SUIT_ORDER.indexOf(second.suit)
            || RANK_ORDER.indexOf(first.rank) - RANK_ORDER.indexOf(second.rank))
        : zoneType === "discard" || zoneType === "crypt"
            ? [...cards].reverse()
            : cards,
);
