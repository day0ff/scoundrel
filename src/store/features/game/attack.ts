import {breakWeapon} from "./weapon-break.ts";
import {resolveAttackedCardActions} from "./card-actions.ts";
import {recordRoomPlay, checkGameVictory} from "./helpers.ts";
import {attackAnimation} from "entities/animations/attack.ts";
import {getCardStrength} from "entities/pasteboards/helpers.ts";
import {thingPasteboard} from "entities/pasteboards/skeleton/Thing.ts";
import {calculateAttack} from "entities/effects/attack.ts";
import type {GameStateType, PlayingCardType, ZoneKindType} from "entities/game/types.ts";

export const canAttackCard = (card: PlayingCardType, zone: ZoneKindType): boolean => {
    if (card.isLocked || card.isNotFound) return false;
    if (card.role === "fist") return zone === "weapons" && card.identifier === "day0ff:pasteboard-fist.0";
    return zone === "weapons" && card.role === "weapon"
        && getCardStrength(card) !== undefined
        && Number.isSafeInteger(card.durability) && (card.durability ?? 0) > 0;
};

export const getAttackTarget = (state: GameStateType) =>
    state.zones.room.cards.find(card => card.role === "enemy");

export const getAttackRejection = (state: GameStateType, attackerId: string, enemyId?: string): "enemyRankTooHigh" | undefined => {
    if (state.outcome || state.currentPhase !== state.phaseLifecycle.waitingPhase) return;
    const attacker = state.zones.weapons.cards.find(card => card.id === attackerId);
    const enemy = enemyId === undefined ? getAttackTarget(state) : state.zones.room.cards.find(card => card.id === enemyId && card.role === "enemy");
    if (!attacker || !canAttackCard(attacker, "weapons") || attacker.role !== "weapon" || !enemy) return;
    if (enemy.identifier === thingPasteboard.identifier) return;
    const previousKill = attacker.killedEnemies?.at(-1);
    const previousStrength = previousKill && getCardStrength(previousKill);
    const enemyStrength = getCardStrength(enemy);
    if (previousStrength !== undefined && enemyStrength !== undefined && enemyStrength > previousStrength) return "enemyRankTooHigh";
};

export const resolveAttack = (state: GameStateType, attackerId: string, enemyId?: string, instantAttack?: {soundUrl: string}) => {
    if (state.outcome || (!instantAttack && state.currentPhase !== state.phaseLifecycle.waitingPhase) || state.hero.health.current <= state.hero.health.min) return;
    const source = [state.zones.room, state.zones.weapons].find(zone => zone.cards.some(card => card.id === attackerId));
    const attacker = source?.cards.find(card => card.id === attackerId);
    const enemy = enemyId === undefined ? getAttackTarget(state) : state.zones.room.cards.find(card => card.id === enemyId && card.role === "enemy");
    // Collection availability flags do not prevent fighting an enemy already on the room.
    if (!source || !attacker || !canAttackCard(attacker, source.type) || !enemy) return;
    const enemyStrength = getCardStrength(enemy);
    const attackerStrength = attacker.role === "fist" ? 0 : getCardStrength(attacker);
    if (enemyStrength === undefined || attackerStrength === undefined) return;
    const previousKill = attacker.role === "weapon" ? attacker.killedEnemies?.at(-1) : undefined;
    if (previousKill && !instantAttack) {
        const previousStrength = getCardStrength(previousKill);
        if (previousStrength === undefined || (enemy.identifier !== thingPasteboard.identifier && enemyStrength > previousStrength)) return;
    }
    return {
        source, attacker, enemy,
        ...calculateAttack(enemyStrength, attackerStrength, attacker.role === "weapon" ? attacker.durability : undefined),
    };
};

export const applyAttack = (state: GameStateType, attackerId: string, enemyId?: string, instantAttack?: {soundUrl: string}) => {
    if (state.animationEvents.some(event => event.animation === "day0ff:animation-hatch")) return;
    const attack = resolveAttack(state, attackerId, enemyId, instantAttack);
    if (!attack) return;
    const {source, attacker, enemy, healthDamage, durability} = attack;
    if (!instantAttack) {
        state.lastPlayedCard = {role: enemy.role, rank: enemy.rank, strength: enemy.strength};
        recordRoomPlay(state, 1);
    }
    const healthBefore = {...state.hero.health};
    state.hero.health.current = Math.max(state.hero.health.min, state.hero.health.current - healthDamage);
    const roomIndex = state.zones.room.cards.findIndex(card => card.id === enemy.id);
    state.animationEvents.push({
        id: ++state.animationSequence,
        animation: attackAnimation.identifier,
        ...(instantAttack ? {instantAttack} : {}),
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
    if (!instantAttack) {
        state.zones.room.cards.splice(roomIndex, 1);
        state.zones.crypt.cards.push(enemy);
        if (attacker.role === "weapon") {
            (attacker.killedEnemies ??= []).push({id: enemy.id, identifier: enemy.identifier, rank: enemy.rank, strength: getCardStrength(enemy)});
        }
    }
    if (durability !== undefined) {
        attacker.durability = durability;
        if (durability === 0) breakWeapon(state, attacker.id);
    }
    if (!instantAttack) resolveAttackedCardActions(state, enemy, roomIndex);
    checkGameVictory(state);
    if ((!instantAttack && state.selectedCardId === enemy.id) || (durability === 0 && state.selectedCardId === attacker.id)) state.selectedCardId = undefined;
};
