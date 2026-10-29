import type {GameStateType} from "entities/game/types.ts";
import {initPasteboard} from "entities/pasteboards/constants.ts";
import {osteomancerPasteboard} from "entities/pasteboards/skeleton/Osteomancer.ts";
import {summonAnimation} from "entities/animations/summon.ts";

const SUMMON_RANKS = ["2", "3", "4", "5", "6", "7", "8", "9"] as const;

export const summonOsteomancerSkeletons = (state: GameStateType) => {
    const room = state.zones.room;
    for (const card of [...room.cards]) {
        if (card.identifier !== osteomancerPasteboard.identifier) continue;
        while (room.cards.length < room.capacity) {
            const count = card.skeletonsSummoned ?? 0;
            const rank = SUMMON_RANKS[Math.min(count, SUMMON_RANKS.length - 1)];
            const summoned = {
                ...initPasteboard(`day0ff:pasteboard-skeleton.${rank}`),
                id: `${card.id}:skeleton:${count + 1}`,
            };
            card.skeletonsSummoned = count + 1;
            room.cards.push(summoned);
            state.animationEvents.push({
                id: ++state.animationSequence,
                animation: summonAnimation.identifier,
                summonerId: card.id,
                summonedId: summoned.id,
                roomBefore: room.cards.map(item => ({...item})),
                healthBefore: {...state.hero.health},
                healthAfter: {...state.hero.health},
            });
        }
    }
};
