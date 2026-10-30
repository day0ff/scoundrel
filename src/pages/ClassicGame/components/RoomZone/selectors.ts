import {createSelector} from "@reduxjs/toolkit";
import {gameSelector} from "store/features/game/selectors.ts";

export const currentRoomNumberSelector = createSelector(
    gameSelector,
    game => (game?.completedRooms?.length ?? 0) + 1,
);

export const roomWithAttackFeedbackSelector = createSelector(
    gameSelector,
    (game) => {
        if (!game) return undefined;
        const entry = game.animationEvents.find(event => event.animation === "day0ff:animation-drain" || event.animation === "day0ff:animation-consume" || event.animation === "day0ff:animation-summon" || event.animation === "day0ff:animation-call");
        if (entry?.animation === "day0ff:animation-drain" || entry?.animation === "day0ff:animation-consume" || entry?.animation === "day0ff:animation-summon" || entry?.animation === "day0ff:animation-call") {
            return {...game.zones.room, cards: entry.roomBefore, capacity: Math.max(game.zones.room.capacity, entry.roomBefore.length)};
        }
        // Until the attack finishes, show the egg in place of its queued hatchling.
        const attackingEggs = new Set(game.animationEvents
            .filter(event => event.animation === "day0ff:animation-attack")
            .map(event => event.enemyId));
        const hiddenHatchlings = new Set(game.animationEvents
            .filter(event => event.animation === "day0ff:animation-hatch" && attackingEggs.has(event.egg.id))
            .map(event => event.animation === "day0ff:animation-hatch" ? event.hatchlingId : ""));
        const cards = game.zones.room.cards.filter(card => !hiddenHatchlings.has(card.id));
        for (const event of [...game.animationEvents].reverse()) {
            if (event.animation !== "day0ff:animation-attack") continue;
            const enemy = game.zones.crypt.cards.find(card => card.id === event.enemyId);
            if (enemy && !cards.some(card => card.id === enemy.id)) cards.splice(event.enemyRoomIndex ?? 0, 0, enemy);
        }
        return {...game.zones.room, cards, capacity: Math.max(game.zones.room.capacity, cards.length)};
    },
);
