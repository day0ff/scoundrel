import {beforeTurnEndPhase} from "entities/phases/beforeTurnEnd.ts";
import {createSlice, type PayloadAction, type UnknownAction} from "@reduxjs/toolkit";
import {createGameLog, isLoggedGameAction} from "./log.ts";
import {getInitialGame} from "./constants.ts";
import {advanceGamePhase, canPlaceCardInZone, canMoveCard, canPlayPotion, restoreGame, shuffleDungeonCards, applyPotion, recordRoomPlay, canEndRoom, canSkipRoom, dealNextRoom, completeRoom, completeTurn} from "./helpers.ts";
import {applyAttack} from "./attack.ts";
import {checkGameVictory} from "./helpers.ts";
import {summonOsteomancerSkeletons} from "./osteomancer.ts";
import {resolveRoomEntryEffects} from "./room-entry.ts";
import type {AttackCardPayloadType} from "entities/game/types.ts";
import type {GameStateType, PreAnimationGameStateType, PreLifecycleGameStateType, HeroLessGameStateType, HandGameStateType, LegacyGameStateType, OldZoneGameStateType, MoveCardPayloadType, PlayCardPayloadType, PlayingCardType, ZoneKindType} from "entities/game/types.ts";

export const gameSlice = createSlice({
    name: "game",
    initialState: null as GameStateType | null,
    reducers: {
        resetDungeon: {
            reducer: (_state, action: PayloadAction<GameStateType>) => action.payload,
            prepare: (...args: Parameters<typeof getInitialGame>) => ({payload: getInitialGame(...args)}),
        },
        clearGame: () => null,
        setTime: (state, {payload}: PayloadAction<string>) => {
            if (state && /^\d{2,}:[0-5]\d:[0-5]\d$/.test(payload)) state.time = payload;
        },
        surrenderGame: (state) => {
            if (!state || state.outcome || state.started === false) return;
            state.outcome = "defeat";
            state.selectedCardId = undefined;
            state.animationEvents = [];
        },
        startGame: (state) => {
            if (!state) return;
            if (state.outcome || state.started !== false) return;
            state.started = true;
            dealNextRoom(state, true);
        },
        setGame: (_state, action: PayloadAction<GameStateType | PreAnimationGameStateType | PreLifecycleGameStateType | HeroLessGameStateType | HandGameStateType | LegacyGameStateType | OldZoneGameStateType | null>) => action.payload ? restoreGame(action.payload) : null,
        completeEffectAnimation: (state, {payload}: PayloadAction<number>) => {
            if (!state) return;
            if (state.animationEvents[0]?.id === payload) state.animationEvents.shift();
        },
        clearEffectAnimations: (state) => { if (state) state.animationEvents = []; },
        advancePhase: (state) => {
            if (!state) return;
            // Player-controlled transitions must use endTurn and its room guard.
            if (state.currentPhase === beforeTurnEndPhase.identifier) {
                // Animation completions are presentation-only; replay advances using this logged action.
                state.animationEvents = [];
                completeTurn(state);
            } else if (state.currentPhase !== state.phaseLifecycle.waitingPhase) advanceGamePhase(state);
        },
        skipRoom: (state) => {
            if (!state) return;
            if (!canSkipRoom(state)) return;
            completeRoom(state, true);
            state.turnNumber += 1;
        },
        endTurn: (state) => {
            if (!state) return;
            if (!canEndRoom(state)) return;
            // Existing saves can still carry the lifecycle from before this phase was added.
            if (!state.phaseLifecycle.phases.includes(beforeTurnEndPhase.identifier)) {
                const waitingIndex = state.phaseLifecycle.phases.indexOf(state.phaseLifecycle.waitingPhase);
                state.phaseLifecycle.phases.splice(waitingIndex + 1, 0, beforeTurnEndPhase.identifier);
            }
            advanceGamePhase(state);
            const sequenceBeforeSummons = state.animationSequence;
            summonOsteomancerSkeletons(state);
            if (state.animationSequence === sequenceBeforeSummons) completeTurn(state);
        },
        selectCard: (state, {payload}: PayloadAction<string | null>) => {
            if (!state) return;
            if (state.outcome || state.currentPhase !== state.phaseLifecycle.waitingPhase) return;
            if (payload === null) {
                state.selectedCardId = undefined;
                return;
            }
            const selectable = [state.zones.room, state.zones.weapons, state.zones.potions]
                .some(zone => zone.cards.some(card => card.id === payload));
            if (selectable) state.selectedCardId = payload;
        },
        playCard: (state, {payload}: PayloadAction<PlayCardPayloadType>) => {
            if (!state) return;
            if (state.outcome || state.currentPhase !== state.phaseLifecycle.waitingPhase) return;
            const source = state.zones[payload.from];
            const index = source?.cards.findIndex(card => card.id === payload.cardId) ?? -1;
            const card = source?.cards[index];
            if (!card || !canPlayPotion(card, payload.from)) return;
            applyPotion(state, card, payload.from);
        },
        attackCard: (state, {payload}: PayloadAction<AttackCardPayloadType>) => {
            if (!state) return;
            applyAttack(state, payload.cardId, payload.enemyId);
        },
        moveCard: (state, {payload}: PayloadAction<MoveCardPayloadType>) => {
            if (!state) return;
            if (!canMoveCard(state, payload)) return;
            const source = state.zones[payload.from];
            const destination = state.zones[payload.to];
            const sourceIndex = source.cards.findIndex(card => card.id === payload.cardId);
            const targetIndex = payload.targetCardId ? destination.cards.findIndex(card => card.id === payload.targetCardId) : destination.cards.length;
            const movingCard = source.cards[sourceIndex];
            if (movingCard.role === "enemy" && payload.to === "weapons") {
                const target = destination.cards[targetIndex];
                const attacker = target ?? destination.cards.find(card => card.role === "fist" && card.identifier === "day0ff:pasteboard-fist.0");
                if (attacker) applyAttack(state, attacker.id, movingCard.id);
                return;
            }
            if ((movingCard.role === "weapon" || movingCard.role === "fist") && payload.from === "weapons" && payload.to === "room") {
                const target = destination.cards[targetIndex];
                applyAttack(state, movingCard.id, target?.role === "enemy" ? target.id : undefined);
                return;
            }
            if (movingCard.role === "potion" && payload.from === "potions" && payload.to === "room") {
                applyPotion(state, movingCard, payload.from);
                return;
            }
            if (source === destination) {
                const [card] = source.cards.splice(sourceIndex, 1);
                source.cards.splice(targetIndex, 0, card);
            } else if (destination.cards.length >= destination.capacity) {
                if (movingCard.role === "potion" || movingCard.role === "weapon") {
                    const [card] = source.cards.splice(sourceIndex, 1);
                    const [replacedCard] = destination.cards.splice(targetIndex, 1, card);
                    state.zones.crypt.cards.push(replacedCard);
                } else {
                    [source.cards[sourceIndex], destination.cards[targetIndex]] = [destination.cards[targetIndex], source.cards[sourceIndex]];
                }
            } else {
                const [card] = source.cards.splice(sourceIndex, 1);
                destination.cards.splice(targetIndex, 0, card);
            }
            if (source !== destination && ["room", "weapons", "potions"].includes(payload.from)) {
                state.lastPlayedCard = {role: movingCard.role, rank: movingCard.rank, strength: movingCard.strength};
                recordRoomPlay(state, payload.from === "room" ? 1 : 0);
            }
            if (![state.zones.room, state.zones.weapons, state.zones.potions]
                .some(zone => zone.cards.some(card => card.id === state.selectedCardId))) state.selectedCardId = undefined;
            checkGameVictory(state);
        },
        addCardsToZone: (state, {payload}: PayloadAction<{zone: ZoneKindType; cards: PlayingCardType[]}>) => {
            if (!state) return;
            if (state.outcome) return;
            const zone = state.zones[payload.zone];
            const ids = new Set(Object.values(state.zones).flatMap(item => item.cards.map(card => card.id)));
            const entered: PlayingCardType[] = [];
            for (const card of payload.cards) {
                if (zone.cards.length >= zone.capacity) break;
                if (ids.has(card.id) || !canPlaceCardInZone(card, payload.zone)) continue;
                const added = {...card};
                zone.cards.push(added);
                entered.push(added);
                ids.add(card.id);
            }
            if (payload.zone === "room") resolveRoomEntryEffects(state, entered);
        },
        removeCardsFromZone: (state, {payload}: PayloadAction<{zone: ZoneKindType; cardIds: string[]}>) => {
            if (!state) return;
            if (state.outcome) return;
            const ids = new Set(payload.cardIds);
            state.zones[payload.zone].cards = state.zones[payload.zone].cards.filter(card => !ids.has(card.id));
            if (state.selectedCardId && ids.has(state.selectedCardId)) state.selectedCardId = undefined;
            checkGameVictory(state);
        },
        setZoneCapacity: (state, {payload}: PayloadAction<{zone: ZoneKindType; capacity: number}>) => {
            if (!state) return;
            if (state.outcome) return;
            if (payload.zone === "dungeon" || payload.zone === "discard" || payload.zone === "crypt") return;
            const zone = state.zones[payload.zone];
            if (!Number.isSafeInteger(payload.capacity) || payload.capacity < zone.cards.length) return;
            zone.capacity = payload.capacity;
        },
        setRoomMinimumCardsToPlay: (state, {payload}: PayloadAction<number>) => {
            if (!state) return;
            if (state.outcome) return;
            if (Number.isSafeInteger(payload) && payload >= 0) state.zones.room.minimumCardsToPlay = payload;
        },
        shuffleDungeon: (state) => {
            if (!state) return;
            if (!state.outcome && state.currentPhase === state.phaseLifecycle.waitingPhase) shuffleDungeonCards(state);
        },
    },
});

export const {setTime, surrenderGame, clearGame, resetDungeon, startGame, setGame, completeEffectAnimation, clearEffectAnimations, advancePhase, selectCard, playCard, attackCard, moveCard, addCardsToZone, removeCardsFromZone, setZoneCapacity, setRoomMinimumCardsToPlay, shuffleDungeon, skipRoom, endTurn} = gameSlice.actions;
// Log only accepted actions, alongside the resulting game state, before persistence listeners run.
const gameReducer = (state: GameStateType | null | undefined, action: UnknownAction): GameStateType | null => {
    const next = gameSlice.reducer(state, action);
    if (!state || !next || next === state || !isLoggedGameAction(action)) return next;
    const log = state.log ?? createGameLog(state, "restoredGame");
    return {...next, log: {...log, entries: [...log.entries, {
        number: log.entries.length + 1,
        turnNumber: state.turnNumber,
        action: structuredClone(action),
        healthAfter: next.hero.health.current,
        seedAfter: {...next.seed},
        outcome: next.outcome,
    }]}};
};

export default gameReducer;
