import type {GameModeType} from "entities/game-modes/types.ts";
import type {PackIdentifierType} from "entities/packs/types.ts";
import {getPack} from "entities/packs/constants.ts";
import {createGameLog} from "./log.ts";
import {getAttackRejection} from "./attack.ts";
import {SeededRandom} from "helpers/SeededRandom.ts";
import {initHero} from "entities/heroes/constants.ts";
import {getPasteboardEffects, initPasteboard, restorePasteboard} from "entities/pasteboards/constants.ts";
import {GAME_MODES} from "entities/game-modes/constants.ts";
import {classicPhaseLifecycle} from "entities/game-modes/phases.ts";
import {calculateScoreRange} from "./score.ts";
import {afterCardPlayedPhase} from "entities/phases/afterCardPlayed.ts";
import {PHASES_MAP} from "entities/phases/constants.ts";
import {getNextLifecyclePhase} from "entities/phases/helpers.ts";
import {healEffect, resolveHealthEffects} from "entities/effects/heal.ts";
import type {EffectBindingType} from "entities/effects/types.ts";
import type {PhaseDataType} from "entities/phases/types.ts";
import type {CardMoveRejectionType, GameStateType, PreAnimationGameStateType, PreLifecycleGameStateType, HeroLessGameStateType, HandGameStateType, LegacyGameStateType, OldZoneGameStateType, MoveCardPayloadType, PlayingCardType, ZoneKindType} from "entities/game/types.ts";
import type {SeedType} from "../types.ts";
import {resolveRoomEntryEffects} from "./room-entry.ts";

export const canPlaceCardInZone = (card: PlayingCardType, zone: ZoneKindType): boolean => {
    if (card.identifier === "day0ff:pasteboard-fist.0") return zone === "weapons";
    if (zone === "weapons") return card.suit === "weapon";
    if (zone === "potions") return card.suit === "heal";
    return true;
};

export const shuffleDungeonCards = (state: GameStateType) => {
    const cards = state.zones.dungeon.cards;
    const random = new SeededRandom(state.seed);
    random.setSeed(state.seed);
    for (let index = cards.length - 1; index > 0; index--) {
        const target = Math.floor(random.random() * (index + 1));
        [cards[index], cards[target]] = [cards[target], cards[index]];
    }
    state.seed = random.getSeed();
};

export const createGame = (
    cards: PlayingCardType[],
    seed: SeedType,
    heroIdentifier: Parameters<typeof initHero>[0] = "day0ff:hero-wanderer",
    mode: GameModeType = "classic",
    packIdentifier: PackIdentifierType = GAME_MODES[mode].defaultPackIdentifier,
): GameStateType => {
    const hero = initHero(heroIdentifier);
    const zones = Object.fromEntries(Object.entries(hero.zones).map(([kind, config]) => [
        kind, {type: kind, capacity: config.capacity, cards: config.defaultCards.map(initPasteboard)},
    ])) as Record<ZoneKindType, GameStateType["zones"]["dungeon"]>;
    const configuredZones = {
        ...zones,
        room: {...zones.room, minimumCardsToPlay: hero.zones.room.minimumCardsToPlay},
        potions: {...zones.potions, maximumPotionsPerRoom: hero.zones.potions.maximumPotionsPerRoom},
    };
    zones.dungeon.cards.push(...cards.map(restorePasteboard));
    const state: GameStateType = {
        mode,
        packIdentifier,
        seed,
        started: false,
        time: "00:00:00",
        completedRooms: [],
        hero,
        phaseLifecycle: {...GAME_MODES[mode].phaseLifecycle, phases: [...GAME_MODES[mode].phaseLifecycle.phases]},
        currentPhase: classicPhaseLifecycle.phases[0],
        turnNumber: 1,
        animationEvents: [],
        animationSequence: 0,
        zones: configuredZones,
        scoreRange: calculateScoreRange(Object.values(configuredZones).flatMap(zone => zone.cards), hero.health.max),
    };
    shuffleDungeonCards(state);
    resolveCurrentPhaseEffects(state);
    for (let index = 0; state.currentPhase !== state.phaseLifecycle.waitingPhase && index < state.phaseLifecycle.phases.length; index++) {
        advanceGamePhase(state);
    }
    state.animationEvents = [];
    state.log = createGameLog(state, "newGame");
    return state;
};

const restoreGameState = (state: GameStateType | PreAnimationGameStateType | PreLifecycleGameStateType | HeroLessGameStateType | HandGameStateType | LegacyGameStateType | OldZoneGameStateType): GameStateType => {
    if (!("zones" in state)) return createGame(state.decks.flatMap(deck => deck.pasteboards), state.seed);
    if ("draw" in state.zones) {
        const {draw, board, ...zones} = state.zones;
        return restoreGameState({
            ...state,
            zones: {...zones, dungeon: {...draw, type: "dungeon"}, room: {...board, type: "room"}},
        } as GameStateType | HandGameStateType);
    }
    const hero = "hero" in state
        ? {...state.hero, zones: Object.fromEntries(Object.entries(initHero(state.hero.identifier).zones).map(([kind, config]) => [
            kind, {...config, ...state.hero.zones?.[kind as ZoneKindType]},
        ])) as GameStateType["hero"]["zones"]}
        : initHero("day0ff:hero-wanderer");
    const savedLifecycle = "phaseLifecycle" in state ? state.phaseLifecycle : undefined;
    const validLifecycle = savedLifecycle && savedLifecycle.phases.length > 0
        && new Set(savedLifecycle.phases).size === savedLifecycle.phases.length
        && savedLifecycle.phases.every(identifier => PHASES_MAP[identifier] && identifier !== afterCardPlayedPhase.identifier)
        && savedLifecycle.phases.includes(savedLifecycle.waitingPhase);
    const phaseLifecycle = validLifecycle ? savedLifecycle : {...classicPhaseLifecycle, phases: [...classicPhaseLifecycle.phases]};
    const currentPhase = validLifecycle && "currentPhase" in state && phaseLifecycle.phases.includes(state.currentPhase)
        ? state.currentPhase : phaseLifecycle.waitingPhase;
    const turnNumber = "turnNumber" in state && Number.isSafeInteger(state.turnNumber) && state.turnNumber > 0 ? state.turnNumber : 1;
    const animationSequence = "animationSequence" in state && Number.isSafeInteger(state.animationSequence) && state.animationSequence >= 0 ? state.animationSequence : 0;
    if (!("hand" in state.zones)) {
        const weapons = state.zones.weapons;
        const hasFist = weapons.cards.some(card => card.identifier === "day0ff:pasteboard-fist.0");
        return {
            ...state, time: "time" in state ? state.time ?? "00:00:00" : "00:00:00", hero, phaseLifecycle, currentPhase, turnNumber, animationEvents: [], animationSequence, selectedCardId: undefined,
            zones: {
                ...state.zones,
                weapons: hasFist ? weapons : {
                    ...weapons,
                    cards: [initPasteboard("day0ff:pasteboard-fist.0"), ...weapons.cards],
                    capacity: weapons.capacity + 1,
                },
            },
        } as GameStateType;
    }
    const {hand, dungeon, discard, room} = state.zones;
    const weapons = hand.cards.filter(card => card.suit === "weapon");
    const potions = hand.cards.filter(card => card.suit === "heal");
    const rejectedCards = hand.cards.filter(card => card.suit !== "weapon" && card.suit !== "heal");
    return {
        mode: "classic",
        packIdentifier: GAME_MODES.classic.defaultPackIdentifier,
        seed: state.seed,
        time: "00:00:00",
        hero,
        phaseLifecycle,
        currentPhase,
        turnNumber,
        animationEvents: [],
        animationSequence,
        zones: {
            dungeon: {type: "dungeon", capacity: dungeon.capacity, cards: [...dungeon.cards, ...rejectedCards, ...weapons.slice(2), ...potions.slice(2)]},
            discard: {...discard, type: "discard"},
            room: {...room, type: "room", minimumCardsToPlay: hero.zones.room.minimumCardsToPlay},
            weapons: {type: "weapons", capacity: 3, cards: [initPasteboard("day0ff:pasteboard-fist.0"), ...weapons.slice(0, 2)]},
            potions: {type: "potions", capacity: 2, maximumPotionsPerRoom: hero.zones.potions.maximumPotionsPerRoom, cards: potions.slice(0, 2)},
            crypt: {type: "crypt", capacity: Infinity, cards: []},
        },
    };
};

export const restoreGame = (state: Parameters<typeof restoreGameState>[0]): GameStateType => {
    const restored = restoreGameState(state);
    restored.mode ??= "classic";
    if (!restored.packIdentifier || !getPack(restored.packIdentifier)) {
        restored.packIdentifier = GAME_MODES[restored.mode].defaultPackIdentifier;
    }
    restored.zones = {...restored.zones};
    for (const kind of Object.keys(restored.zones) as ZoneKindType[]) {
        if (kind === "room") {
            const room = restored.zones.room;
            restored.zones.room = {...room, cards: room.cards.map(restorePasteboard),
                minimumCardsToPlay: room.minimumCardsToPlay ?? restored.hero.zones.room.minimumCardsToPlay};
        } else if (kind === "potions") {
            const potions = restored.zones.potions;
            restored.zones.potions = {...potions, cards: potions.cards.map(restorePasteboard),
                maximumPotionsPerRoom: potions.maximumPotionsPerRoom ?? restored.hero.zones.potions.maximumPotionsPerRoom};
        } else {
            const zone = restored.zones[kind];
            restored.zones[kind] = {...zone, cards: zone.cards.map(restorePasteboard)};
        }
    }
    restored.roomProgress ??= {
        fightStarted: (restored.activeRoomCards?.length ?? restored.zones.room.cards.length) > restored.zones.room.cards.length,
        cardsPlayed: Math.max(0, (restored.activeRoomCards?.length ?? restored.zones.room.cards.length) - restored.zones.room.cards.length),
        skipAllowed: true,
    };
    // Older saves have no fixed bounds; recover them from the initial snapshot when available.
    restored.scoreRange ??= calculateScoreRange(
        Object.values(restored.log?.initialState.zones ?? restored.zones).flatMap(zone => zone.cards),
        restored.hero.health.max,
    );
    if (restored.roomProgress.potionPlayed !== undefined) {
        restored.roomProgress = {...restored.roomProgress,
            potionsPlayed: restored.roomProgress.potionsPlayed ?? (restored.roomProgress.potionPlayed ? 1 : 0)};
        delete restored.roomProgress.potionPlayed;
    }
    checkGameDefeat(restored);
    if (restored.started !== false && !restored.zones.room.cards.length) checkGameVictory(restored);
    if (!("log" in state) || !state.log || state.log.version !== 1) restored.log = createGameLog(restored, "restoredGame");
    return restored;
};

// Shared by the reducer and UI so rejection feedback matches the enforced rule.
export const getCardMoveRejection = (state: GameStateType, move: MoveCardPayloadType): CardMoveRejectionType | undefined => {
    if (state.outcome || state.currentPhase !== state.phaseLifecycle.waitingPhase) return "invalidMove";
    const source = state.zones[move.from];
    const destination = state.zones[move.to];
    const card = source?.cards.find(item => item.id === move.cardId);
    const target = destination?.cards.find(item => item.id === move.targetCardId);
    if (!source || !destination || !card || (move.targetCardId && !target)) return "invalidMove";
    if (move.from === "crypt") return "invalidMove";
    if (card.role === "enemy") {
        if (move.from === "room" && move.to === "room") return;
        if (move.from !== "room" || move.to !== "weapons") return "invalidMove";
        if (target && target.role !== "weapon" && target.role !== "fist") return "equipmentCardNotAllowed";
        return target ? getAttackRejection(state, target.id, card.id) : undefined;
    }
    if (card.role === "fist") {
        return move.from === "weapons" && (move.to === "room" || move.to === "weapons") ? undefined : "invalidMove";
    }
    if (card.role === "weapon") {
        if (move.from === "weapons" && move.to === "room") {
            return getAttackRejection(state, card.id, target?.role === "enemy" ? target.id : undefined);
        }
        if (move.from === "weapons") return move.to === "room" || move.to === "crypt" || move.to === "weapons" ? undefined : "invalidMove";
        if (move.from !== "room") return "invalidMove";
        if (move.to === "room" || move.to === "crypt") return;
        if (move.to !== "weapons") return "equipmentCardNotAllowed";
        if (target && target.role !== "weapon") return "equipmentCardNotAllowed";
        if (destination.cards.length >= destination.capacity && !target) return "zoneFull";
        return;
    }
    if (card.role === "potion") {
        if (move.from !== "room" && move.from !== "potions") return "invalidMove";
        if (move.from === move.to) return;
        if (move.to === "crypt") return;
        if (move.from === "potions") {
            if (move.to === "room" && target?.role === "potion") return "invalidMove";
            return move.to === "room" && canPlayPotion(card, move.from) ? undefined : "invalidMove";
        }
        if (move.to !== "potions") return "equipmentCardNotAllowed";
        if (destination.cards.length >= destination.capacity) {
            if (!target) return "zoneFull";
            if (target.role !== "potion") return "equipmentCardNotAllowed";
        }
        return;
    }
    if (move.from === move.to) return;
    if (!canPlaceCardInZone(card, move.to)) return "equipmentCardNotAllowed";
    if (destination.cards.length >= destination.capacity) {
        if (!target) return "zoneFull";
        // A swap moves the target back into the source zone as well.
        if (!canPlaceCardInZone(target, move.from)) return "equipmentCardNotAllowed";
    }
};

export const canMoveCard = (state: GameStateType, move: MoveCardPayloadType): boolean =>
    getCardMoveRejection(state, move) === undefined;

export const canPlayPotion = (card: PlayingCardType, zone: ZoneKindType): boolean =>
    (zone === "room" || zone === "potions") && card.role === "potion"
    && !card.isLocked && !card.isNotFound && getPasteboardEffects(card).length > 0;

export const applyPotion = (state: GameStateType, card: PlayingCardType, from: ZoneKindType) => {
    if (state.outcome) return;
    state.lastPlayedCard = {role: card.role, rank: card.rank, strength: card.strength};
    recordRoomPlay(state, from === "room" ? 1 : 0);
    const source = state.zones[from];
    source.cards.splice(source.cards.findIndex(item => item.id === card.id), 1);
    state.zones.crypt.cards.push(card);
    if (state.roomProgress) {
        const played = state.roomProgress.potionsPlayed ?? (state.roomProgress.potionPlayed ? 1 : 0);
        state.roomProgress.potionsPlayed = played + 1;
        if (played < state.zones.potions.maximumPotionsPerRoom) {
            applyHealthEffects(state, getPasteboardEffects(card), afterCardPlayedPhase.trigger, card);
        }
    }
    if (state.selectedCardId === card.id) state.selectedCardId = undefined;
    checkGameVictory(state);
};

export const resolveCurrentPhaseEffects = (state: GameStateType) => {
    const phase = PHASES_MAP[state.currentPhase];
    if (!phase) return;
    const bindings = [
        ...(state.hero.effects ?? []),
        ...[state.zones.room, state.zones.weapons, state.zones.potions]
            .flatMap(zone => zone.cards.filter(card => !card.isLocked && !card.isNotFound).flatMap(getPasteboardEffects)),
    ];
    applyHealthEffects(state, bindings, phase.trigger);
};

export const applyHealthEffects = (state: GameStateType, bindings: readonly EffectBindingType[], trigger: PhaseDataType<string>["trigger"], potion?: PlayingCardType) => {
    if (state.outcome) return;
    state.hero.health = resolveHealthEffects(state.hero.health, bindings, trigger, (healthBefore, healthAfter) => {
        state.animationEvents.push({
            id: ++state.animationSequence,
            animation: healEffect.animation,
            ...(potion ? {potion: {...potion}} : {}),
            healthBefore: {...healthBefore},
            healthAfter: {...healthAfter},
        });
    });
    checkGameDefeat(state);
};

export const advanceGamePhase = (state: GameStateType) => {
    if (state.outcome) return;
    const next = getNextLifecyclePhase(state.phaseLifecycle, state.currentPhase);
    if (!next) return;
    state.currentPhase = next.identifier;
    if (next.startsTurn) state.turnNumber += 1;
    state.selectedCardId = undefined;
    resolveCurrentPhaseEffects(state);
};

export const recordRoomPlay = (state: GameStateType, cardsPlayed: number) => {
    state.roomProgress ??= {fightStarted: false, cardsPlayed: 0, skipAllowed: true};
    state.roomProgress.fightStarted = true;
    state.roomProgress.cardsPlayed += cardsPlayed;
};

export const canEndRoom = (state: GameStateType) =>
    !state.outcome && state.started !== false && state.currentPhase === state.phaseLifecycle.waitingPhase
    && (state.zones.room.cards.length === 0
        || !state.zones.room.cards.some(card => card.role === "enemy")
        || (state.roomProgress?.cardsPlayed ?? 0) >= state.zones.room.minimumCardsToPlay);

export const canSkipRoom = (state: GameStateType) =>
    !state.outcome && state.started !== false && state.currentPhase === state.phaseLifecycle.waitingPhase
    && state.zones.room.cards.length > 0 && !state.roomProgress?.fightStarted
    && state.roomProgress?.skipAllowed !== false;

export const dealNextRoom = (state: GameStateType, skipAllowed: boolean) => {
    if (state.outcome) return;
    const {dungeon, discard, room} = state.zones;
    if (!dungeon.cards.length && discard.cards.length) {
        dungeon.cards.push(...discard.cards.splice(0));
        shuffleDungeonCards(state);
    }
    room.cards = dungeon.cards.splice(0, room.capacity);
    resolveRoomEntryEffects(state, [...room.cards]);
    state.activeRoomCards = room.cards.map(card => ({...card}));
    state.roomProgress = {fightStarted: false, cardsPlayed: 0, skipAllowed};
    state.selectedCardId = undefined;
    checkGameVictory(state);
};

export const completeRoom = (state: GameStateType, skipped: boolean) => {
    const previous = state.activeRoomCards ?? state.zones.room.cards;
    if (previous.length) (state.completedRooms ??= []).push(previous.map(card => ({...card})));
    for (const card of state.zones.room.cards) {
        state.zones[skipped || card.role === "enemy" ? "discard" : "crypt"].cards.push(card);
    }
    state.zones.room.cards = [];
    checkGameVictory(state);
    dealNextRoom(state, !skipped);
};

export const checkGameDefeat = (state: GameStateType) => {
    if (state.hero.health.current <= 0) {
        state.outcome = "defeat";
        state.selectedCardId = undefined;
    }
};

export const checkGameVictory = (state: GameStateType) => {
    checkGameDefeat(state);
    if (!state.outcome && state.started !== false
        && !state.zones.dungeon.cards.length && !state.zones.discard.cards.length && !state.zones.room.cards.length) {
        state.outcome = "victory";
        state.selectedCardId = undefined;
    }
};
