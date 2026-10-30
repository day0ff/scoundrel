import {applyAttack, resolveAttack} from "./attack.ts";
import {breakWeapon} from "./weapon-break.ts";
import {getPasteboardActions, initPasteboard} from "entities/pasteboards/constants.ts";
import {getCardStrength} from "entities/pasteboards/helpers.ts";
import type {PasteboardActionType} from "entities/pasteboards/actions/types.ts";
import type {GameStateType, PlayingCardType} from "entities/game/types.ts";
import type {PhaseDataType} from "entities/phases/types.ts";
import {roomEntryPhase} from "entities/phases/roomEntry.ts";
import {consumeAnimation} from "entities/animations/consume.ts";
import {summonAnimation} from "entities/animations/summon.ts";

type PendingActionType = {card: PlayingCardType; action: PasteboardActionType};

const queueSummonAnimation = (state: GameStateType, card: PlayingCardType, action: PasteboardActionType, summoned?: PlayingCardType) => {
    state.animationEvents.push({
        id: ++state.animationSequence,
        animation: summonAnimation.identifier,
        summonerId: card.id,
        animationCardId: card.id,
        actionAnimation: action.animation,
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
    queueSummonAnimation(state, card, action, summoned);
    return [summoned];
};

const call = (state: GameStateType, card: PlayingCardType, action: Extract<PasteboardActionType, {type: "call"}>) => {
    const count = nextSummonNumber(card, action);
    const sourceZone = action.source === "dungeonOrDiscard"
        ? (state.zones.dungeon.cards.length ? "dungeon" : "discard")
        : action.source === "discard" ? "discard" : undefined;
    const source = sourceZone && state.zones[sourceZone];
    const index = source
        ? (action.source === "dungeonOrDiscard" && sourceZone === "discard"
            ? source.cards.map(item => item.role).lastIndexOf("enemy")
            : source.cards.findIndex(item => item.role === "enemy"))
        : -1;
    const summoned = source
        ? (index === -1 ? undefined : source.cards.splice(index, 1)[0])
        : "identifier" in action ? {...initPasteboard(action.identifier), id: `${card.id}:${action.id}:${count}`} : undefined;
    if (summoned) state.zones.room.cards.push(summoned);
    state.animationEvents.push({
        id: ++state.animationSequence,
        animation: "day0ff:animation-call",
        summonerId: card.id,
        summonedId: summoned?.id,
        sourceZone,
        soundUrl: action.soundUrl,
        soundWaves: action.soundWaves,
        animationCardId: card.id,
        actionAnimation: action.animation,
        roomBefore: state.zones.room.cards.map(item => ({...item})),
        healthBefore: {...state.hero.health},
        healthAfter: {...state.hero.health},
    });
    return summoned ? [summoned] : [];
};

const summonStrongestEnemyFromCrypt = (state: GameStateType, card: PlayingCardType, action: PasteboardActionType) => {
    const enemies = state.zones.crypt.cards;
    let strongestIndex = -1;
    for (let index = 0; index < enemies.length; index++) {
        if (enemies[index].role !== "enemy") continue;
        if (strongestIndex === -1 || (getCardStrength(enemies[index]) ?? 0) > (getCardStrength(enemies[strongestIndex]) ?? 0)) {
            strongestIndex = index;
        }
    }
    if (strongestIndex === -1) {
        queueSummonAnimation(state, card, action);
        return [];
    }
    // The room selector provides temporary overflow slots without increasing future deals.
    const [summoned] = enemies.splice(strongestIndex, 1);
    state.zones.room.cards.push(summoned);
    queueSummonAnimation(state, card, action, summoned);
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
        queueSummonAnimation(state, card, action, summoned);
    }
    return summonedCards;
};

const consumeEnemies = (state: GameStateType, card: PlayingCardType, action: PasteboardActionType) => {
    const consumed = state.zones.room.cards.filter(item => item.role === "enemy" && item.id !== card.id);
    for (const enemy of consumed) {
        state.animationEvents.push({
            id: ++state.animationSequence,
            animation: consumeAnimation.identifier,
            consumerId: card.id,
            animationCardId: card.id,
            actionAnimation: action.animation,
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

const drainPotions = (state: GameStateType, card: PlayingCardType, action: PasteboardActionType) => {
    const potions = [...state.zones.room.cards, ...state.zones.potions.cards].filter(card => card.role === "potion");
    if (!potions.length) return;
    const ids = new Set(potions.map(card => card.id));
    state.animationEvents.push({
        id: ++state.animationSequence,
        animation: "day0ff:animation-drain",
        drainerId: card.id,
        animationCardId: card.id,
        actionAnimation: action.animation,
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

const breakAllWeapons = (
    state: GameStateType,
    card: PlayingCardType,
    action: Extract<PasteboardActionType, {type: "breakAllWeapons"}>,
) => {
    const fog = action.animation?.fogColor ? {
        id: `${card.id}:${action.id}:${state.animationSequence + 1}`,
        color: action.animation.fogColor,
    } : undefined;
    const weaponBreakIds: number[] = [];
    state.animationEvents.push({
        id: ++state.animationSequence,
        animation: "day0ff:animation-sound",
        fog,
        cardId: card.id,
        weaponBreakIds,
        url: action.soundUrl,
        actionAnimation: action.animation,
        roomBefore: state.zones.room.cards.map(item => ({...item})),
        healthBefore: {...state.hero.health},
        healthAfter: {...state.hero.health},
    });
    const weapons = [...state.zones.room.cards, ...state.zones.weapons.cards]
        .filter(item => item.role === "weapon");
    for (const weapon of weapons) {
        breakWeapon(state, weapon.id, fog);
        weaponBreakIds.push(state.animationSequence);
    }
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
        if (action.type === "instantAttack") {
            const feedback = {soundUrl: action.soundUrl};
            const attacker = [...state.zones.weapons.cards].sort((a, b) => Number(a.role === "fist") - Number(b.role === "fist"))
                .find(weapon => resolveAttack(state, weapon.id, card.id, feedback));
            if (attacker) applyAttack(state, attacker.id, card.id, feedback);
        }
        if (action.type === "breakAllWeapons") breakAllWeapons(state, card, action);
        if (action.type === "drainPotions") drainPotions(state, card, action);
        const summoned = action.type === "call" ? call(state, card, action)
            : action.type === "summon" ? summon(state, card, action)
            : action.type === "summonSequence" ? summonSequence(state, card, action)
            : action.type === "summonStrongestEnemyFromCrypt" ? summonStrongestEnemyFromCrypt(state, card, action) : [];
        for (const arriving of summoned) enqueue(arriving, roomEntryPhase.identifier);
    }
    for (const {card, action} of consumers) {
        if (state.zones.room.cards.some(item => item.id === card.id)) consumeEnemies(state, card, action);
    }
};

// Attack-triggered actions are independent of turn and room-entry actions.
export const resolveAttackedCardActions = (state: GameStateType, egg: PlayingCardType, roomIndex: number) => {
    for (const action of getPasteboardActions(egg)) {
        if (action.type !== "hatchOnAttack") continue;
        const count = nextSummonNumber(egg, action);
        const hatchling = {...initPasteboard(action.identifier), id: `${egg.id}:${action.id}:${count}`};
        state.zones.room.cards.splice(roomIndex, 0, hatchling);
        state.animationEvents.push({
            id: ++state.animationSequence,
            animation: "day0ff:animation-hatch",
            egg: {...egg},
            hatchlingId: hatchling.id,
            animationCardId: hatchling.id,
            actionAnimation: action.animation,
            healthBefore: {...state.hero.health},
            healthAfter: {...state.hero.health},
        });
        resolvePasteboardActions(state, roomEntryPhase.identifier, [hatchling]);
    }
};
