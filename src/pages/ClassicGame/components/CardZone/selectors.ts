import {createSelector} from "@reduxjs/toolkit";
import {classicGameSelector} from "store/features/classic-game/selectors.ts";

export const weaponsWithAttackFeedbackSelector = createSelector(
    classicGameSelector,
    game => {
        if (!game) return undefined;
        const zone = game.zones.weapons;
        const cards = [...zone.cards];
        for (const event of [...game.animationEvents].reverse()) {
            if (event.animation !== "day0ff:animation-attack" || !event.attacker || !event.weaponBroken) continue;
            if (!cards.some(card => card.id === event.attackerId)) cards.splice(event.attackerZoneIndex ?? cards.length, 0, event.attacker);
        }
        return {...zone, cards, capacity: Math.max(zone.capacity, cards.length)};
    },
);
