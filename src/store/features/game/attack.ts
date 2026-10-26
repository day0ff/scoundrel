import {recordRoomPlay, checkGameVictory} from "./helpers.ts";
import {attackAnimation} from "entities/animations/attack.ts";
import {RANK_STRENGTH_MAP} from "entities/constants.ts";
import {calculateAttack} from "entities/effects/attack.ts";
import type {GameStateType, PlayingCardType, ZoneKindType} from "entities/game/types.ts";

export const canAttackCard = (card: PlayingCardType, zone: ZoneKindType): boolean => {
    if (card.isLocked || card.isNotFound) return false;
    if (card.role === "fist") return zone === "weapons" && card.identifier === "day0ff:pasteboard-fist.0";
    return zone === "weapons" && card.role === "weapon"
        && RANK_STRENGTH_MAP[card.rank] !== undefined
        && Number.isSafeInteger(card.durability) && (card.durability ?? 0) > 0;
};

export const getAttackTarget = (state: GameStateType) =>
    state.zones.room.cards.find(card => card.role === "enemy");

export const getAttackRejection = (state: GameStateType, attackerId: string, enemyId?: string): "enemyRankTooHigh" | undefined => {
    if (state.outcome || state.currentPhase !== state.phaseLifecycle.waitingPhase) return;
    const attacker = state.zones.weapons.cards.find(card => card.id === attackerId);
    const enemy = enemyId === undefined ? getAttackTarget(state) : state.zones.room.cards.find(card => card.id === enemyId && card.role === "enemy");
    if (!attacker || !canAttackCard(attacker, "weapons") || attacker.role !== "weapon" || !enemy) return;
    const previousKill = attacker.killedEnemies?.at(-1);
    const previousStrength = previousKill && RANK_STRENGTH_MAP[previousKill.rank];
    const enemyStrength = RANK_STRENGTH_MAP[enemy.rank];
    if (previousStrength !== undefined && enemyStrength !== undefined && enemyStrength > previousStrength) return "enemyRankTooHigh";
};

export const resolveAttack = (state: GameStateType, attackerId: string, enemyId?: string) => {
    if (state.outcome || state.currentPhase !== state.phaseLifecycle.waitingPhase || state.hero.health.current <= state.hero.health.min) return;
    const source = [state.zones.room, state.zones.weapons].find(zone => zone.cards.some(card => card.id === attackerId));
    const attacker = source?.cards.find(card => card.id === attackerId);
    const enemy = enemyId === undefined ? getAttackTarget(state) : state.zones.room.cards.find(card => card.id === enemyId && card.role === "enemy");
    // Collection availability flags do not prevent fighting an enemy already on the room.
    if (!source || !attacker || !canAttackCard(attacker, source.type) || !enemy) return;
    const enemyStrength = RANK_STRENGTH_MAP[enemy.rank];
    const attackerStrength = attacker.role === "fist" ? 0 : RANK_STRENGTH_MAP[attacker.rank];
    if (enemyStrength === undefined || attackerStrength === undefined) return;
    const previousKill = attacker.role === "weapon" ? attacker.killedEnemies?.at(-1) : undefined;
    if (previousKill) {
        const previousStrength = RANK_STRENGTH_MAP[previousKill.rank];
        if (previousStrength === undefined || getAttackRejection(state, attackerId, enemy.id)) return;
    }
    return {
        source, attacker, enemy,
        ...calculateAttack(enemyStrength, attackerStrength, attacker.role === "weapon" ? attacker.durability : undefined),
    };
};

export const applyAttack = (state: GameStateType, attackerId: string, enemyId?: string) => {
    const attack = resolveAttack(state, attackerId, enemyId);
    if (!attack) return;
    const {source, attacker, enemy, healthDamage, durability} = attack;
    state.lastPlayedCard = {role: enemy.role, rank: enemy.rank};
    recordRoomPlay(state, 1);
    const healthBefore = {...state.hero.health};
    state.hero.health.current = Math.max(state.hero.health.min, state.hero.health.current - healthDamage);
    state.animationEvents.push({
        id: ++state.animationSequence,
        animation: attackAnimation.identifier,
        attackerId: attacker.id,
        attacker: {...attacker},
        attackerZoneIndex: source.cards.findIndex(card => card.id === attacker.id),
        enemyId: enemy.id,
        enemyRoomIndex: state.zones.room.cards.findIndex(card => card.id === enemy.id),
        enemy: {...enemy},
        healthBefore,
        healthAfter: {...state.hero.health},
        healthDamage: healthBefore.current - state.hero.health.current,
        weaponBroken: durability === 0,
    });
    state.zones.room.cards.splice(state.zones.room.cards.findIndex(card => card.id === enemy.id), 1);
    state.zones.crypt.cards.push(enemy);
    if (attacker.role === "weapon") {
        (attacker.killedEnemies ??= []).push({id: enemy.id, identifier: enemy.identifier, rank: enemy.rank});
    }
    if (durability !== undefined) {
        attacker.durability = durability;
        if (durability === 0) {
            source.cards.splice(source.cards.findIndex(card => card.id === attacker.id), 1);
            state.zones.crypt.cards.push(attacker);
        }
    }
    checkGameVictory(state);
    if (state.selectedCardId === enemy.id || (durability === 0 && state.selectedCardId === attacker.id)) state.selectedCardId = undefined;
};
