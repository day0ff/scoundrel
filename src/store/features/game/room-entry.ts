import {initPasteboard} from "entities/pasteboards/constants.ts";
import {getCardStrength} from "entities/pasteboards/helpers.ts";
import type {GameStateType, PlayingCardType} from "entities/game/types.ts";
import {consumeAnimation} from "entities/animations/consume.ts";

export const resolveRoomEntryEffects = (state: GameStateType, entered: PlayingCardType[]) => {
    const arriving = [...entered];
    // Summon first, then let the arriving Things absorb the complete enemy group.
    for (const card of arriving) {
        if (card.roomEntryEffect?.type !== "summon") continue;
        card.roomEntries = (card.roomEntries ?? 0) + 1;
        const summoned = {
            ...initPasteboard(card.roomEntryEffect.identifier),
            // A stable source/entry ID makes summons identical during save replay.
            id: `${card.id}:summon:${card.roomEntries}`,
        };
        state.zones.room.cards.push(summoned);
        arriving.push(summoned);
    }
    for (const card of arriving) {
        if (card.roomEntryEffect?.type !== "consumeEnemies" || !state.zones.room.cards.some(item => item.id === card.id)) continue;
        const consumed = state.zones.room.cards.filter(item => item.role === "enemy" && item.id !== card.id);
        if (!consumed.length) continue;
        for (const enemy of consumed) {
            state.animationEvents.push({
                id: ++state.animationSequence,
                animation: consumeAnimation.identifier,
                consumerId: card.id,
                enemyId: enemy.id,
                roomBefore: state.zones.room.cards.map(item => ({...item})),
                healthBefore: {...state.hero.health},
                healthAfter: {...state.hero.health},
            });
            card.strength = (getCardStrength(card) ?? 0) + (getCardStrength(enemy) ?? 0);
            state.zones.room.cards = state.zones.room.cards.filter(item => item.id !== enemy.id);
            state.zones.crypt.cards.push(enemy);
            if (state.selectedCardId === enemy.id) state.selectedCardId = undefined;
        }
    }
};
