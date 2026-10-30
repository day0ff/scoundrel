import {createSelector} from "@reduxjs/toolkit";
import {gameSelector} from "store/features/game/selectors.ts";

export const weaponsWithAttackFeedbackSelector = createSelector(
    gameSelector,
    game => {
        if (!game) return undefined;
        const zone = game.zones.weapons;
        const cards = [...zone.cards];
        for (const event of [...game.animationEvents].reverse()) {
            if (event.animation === "day0ff:animation-weaponBreak" && event.weaponZone !== "room") {
                if (!cards.some(card => card.id === event.weapon.id)) {
                    cards.splice(event.weaponZoneIndex, 0, event.weapon);
                }
            }
            if (event.animation === "day0ff:animation-attack" && event.weaponBroken && event.attacker) {
                const index = cards.findIndex(card => card.id === event.attackerId);
                if (index === -1) cards.splice(event.attackerZoneIndex ?? cards.length, 0, event.attacker);
                else cards[index] = event.attacker;
            }
        }
        return {...zone, cards, capacity: Math.max(zone.capacity, cards.length)};
    },
);
