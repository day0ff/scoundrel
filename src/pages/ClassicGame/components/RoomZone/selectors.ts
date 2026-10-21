import {createSelector} from "@reduxjs/toolkit";
import {classicGameSelector} from "store/features/classic-game/selectors.ts";

export const currentRoomNumberSelector = createSelector(
    classicGameSelector,
    game => (game?.completedRooms?.length ?? 0) + 1,
);

export const roomWithAttackFeedbackSelector = createSelector(
    classicGameSelector,
    (game) => {
        if (!game) return undefined;
        const cards = [...game.zones.room.cards];
        for (const event of [...game.animationEvents].reverse()) {
            if (event.animation !== "day0ff:animation-attack") continue;
            const enemy = game.zones.crypt.cards.find(card => card.id === event.enemyId);
            if (enemy && !cards.some(card => card.id === enemy.id)) cards.splice(event.enemyRoomIndex ?? 0, 0, enemy);
        }
        return {...game.zones.room, cards, capacity: Math.max(game.zones.room.capacity, cards.length)};
    },
);
