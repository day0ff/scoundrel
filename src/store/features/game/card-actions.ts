import {getPasteboardActions, initPasteboard} from "entities/pasteboards/constants.ts";
import {getCardStrength} from "entities/pasteboards/helpers.ts";
import type {PasteboardActionType} from "entities/pasteboards/actions/types.ts";
import type {GameStateType, PlayingCardType} from "entities/game/types.ts";
import type {PhaseDataType} from "entities/phases/types.ts";
import {roomEntryPhase} from "entities/phases/roomEntry.ts";
import {consumeAnimation} from "entities/animations/consume.ts";
import {summonAnimation} from "entities/animations/summon.ts";

type PendingActionType = {card: PlayingCardType; action: PasteboardActionType};

const queueSummonAnimation = (state: GameStateType, card: PlayingCardType, summoned?: PlayingCardType) => {
    state.animationEvents.push({
        id: ++state.animationSequence,
        animation: summonAnimation.identifier,
        summonerId: card.id,
        summonedId: summoned?.id,
        roomBefore: state.zones.room.cards.map(item => ({...item})),
        healthBefore: {...state.hero.health},
        healthAfter: {...state.hero.health},
    });
};

const nextSummonNumber = (card: PlayingCardType, action: PasteboardActionType) => {
    const count = (card.actionProgress?.[action.id] ?? 0) + 1;
    card.actionProgress = {...card.actionProgress, [action.id]: count};
    return count;
};

const summon = (state: GameStateType, card: PlayingCardType, action: Extract<PasteboardActionType, {type: "summon"}>) => {
    const source = [state.zones.dungeon, state.zones.discard, state.zones.crypt]
        .find(zone => zone.cards.some(item => item.identifier === action.identifier));
    const count = nextSummonNumber(card, action);
    const summoned = source
        ? source.cards.splice(source.cards.findIndex(item => item.identifier === action.identifier), 1)[0]
        : {...initPasteboard(action.identifier), id: `${card.id}:${action.id}:${count}`};
    state.zones.room.cards.push(summoned);
    queueSummonAnimation(state, card, summoned);
    return [summoned];
};

const summonStrongestEnemyFromCrypt = (state: GameStateType, card: PlayingCardType) => {
    const enemies = state.zones.crypt.cards;
    let strongestIndex = -1;
    for (let index = 0; index < enemies.length; index++) {
        if (enemies[index].role !== "enemy") continue;
        if (strongestIndex === -1 || (getCardStrength(enemies[index]) ?? 0) > (getCardStrength(enemies[strongestIndex]) ?? 0)) {
            strongestIndex = index;
        }
    }
    if (strongestIndex === -1) {
        queueSummonAnimation(state, card);
        return [];
    }
    // The room selector provides temporary overflow slots without increasing future deals.
    const [summoned] = enemies.splice(strongestIndex, 1);
    state.zones.room.cards.push(summoned);
    queueSummonAnimation(state, card, summoned);
    return [summoned];
};

const summonSequence = (state: GameStateType, card: PlayingCardType, action: Extract<PasteboardActionType, {type: "summonSequence"}>) => {
    const summonedCards: PlayingCardType[] = [];
    while (state.zones.room.cards.length < state.zones.room.capacity) {
        const count = nextSummonNumber(card, action);
        const rank = action.ranks[Math.min(count - 1, action.ranks.length - 1)];
        const summoned = {
            ...initPasteboard(`day0ff:pasteboard-${action.suit}.${rank}`),
            id: `${card.id}:${action.id}:${count}`,
        };
        state.zones.room.cards.push(summoned);
        summonedCards.push(summoned);
        queueSummonAnimation(state, card, summoned);
    }
    return summonedCards;
};

const consumeEnemies = (state: GameStateType, card: PlayingCardType) => {
    const consumed = state.zones.room.cards.filter(item => item.role === "enemy" && item.id !== card.id);
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
};

const drainPotions = (state: GameStateType) => {
    const potions = [...state.zones.room.cards, ...state.zones.potions.cards].filter(card => card.role === "potion");
    if (!potions.length) return;
    const ids = new Set(potions.map(card => card.id));
    state.animationEvents.push({
        id: ++state.animationSequence,
        animation: "day0ff:animation-drain",
        potionIds: [...ids],
        roomBefore: state.zones.room.cards.map(card => ({...card})),
        potionsBefore: state.zones.potions.cards.map(card => ({...card})),
        healthBefore: {...state.hero.health},
        healthAfter: {...state.hero.health},
    });
    state.zones.room.cards = state.zones.room.cards.filter(card => !ids.has(card.id));
    state.zones.potions.cards = state.zones.potions.cards.filter(card => !ids.has(card.id));
    state.zones.crypt.cards.push(...potions);
    if (state.selectedCardId && ids.has(state.selectedCardId)) state.selectedCardId = undefined;
};

export const resolvePasteboardActions = (
    state: GameStateType,
    phase: PhaseDataType<string>["identifier"],
    cards: readonly PlayingCardType[] = state.zones.room.cards,
) => {
    if (state.outcome) return;
    const pending: PendingActionType[] = [];
    const consumers: PendingActionType[] = [];
    const scheduled = new Set<string>();
    const enqueue = (card: PlayingCardType, actionPhase: PhaseDataType<string>["identifier"]) => {
        for (const action of getPasteboardActions(card)) {
            if (action.phase !== actionPhase) continue;
            const key = JSON.stringify([card.id, action.id, actionPhase]);
            if (scheduled.has(key)) continue;
            scheduled.add(key);
            (action.type === "consumeEnemies" ? consumers : pending).push({card, action});
        }
    };
    for (const card of [...cards]) enqueue(card, phase);
    // Resolve summons (including arrivals they cause) before any consumer acts.
    for (const {card, action} of pending) {
        if (!state.zones.room.cards.some(item => item.id === card.id)) continue;
        if (action.type === "drainPotions") drainPotions(state);
        const summoned = action.type === "summon" ? summon(state, card, action)
            : action.type === "summonSequence" ? summonSequence(state, card, action)
            : action.type === "summonStrongestEnemyFromCrypt" ? summonStrongestEnemyFromCrypt(state, card) : [];
        for (const arriving of summoned) enqueue(arriving, roomEntryPhase.identifier);
    }
    for (const {card} of consumers) {
        if (state.zones.room.cards.some(item => item.id === card.id)) consumeEnemies(state, card);
    }
};
