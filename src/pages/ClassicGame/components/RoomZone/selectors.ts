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
        const entry = game.animationEvents.find(event => event.animation === "day0ff:animation-consume" || event.animation === "day0ff:animation-summon");
        if (entry?.animation === "day0ff:animation-consume" || entry?.animation === "day0ff:animation-summon") {
            return {...game.zones.room, cards: entry.roomBefore, capacity: Math.max(game.zones.room.capacity, entry.roomBefore.length)};
        }
        const cards = [...game.zones.room.cards];
        for (const event of [...game.animationEvents].reverse()) {
            if (event.animation !== "day0ff:animation-attack") continue;
            const enemy = game.zones.crypt.cards.find(card => card.id === event.enemyId);
            if (enemy && !cards.some(card => card.id === enemy.id)) cards.splice(event.enemyRoomIndex ?? 0, 0, enemy);
        }
        return {...game.zones.room, cards, capacity: Math.max(game.zones.room.capacity, cards.length)};
    },
);
