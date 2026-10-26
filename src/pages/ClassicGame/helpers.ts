import {pointerWithin, rectIntersection, type CollisionDetection} from "@dnd-kit/core";
import type {GameStateType, MoveCardPayloadType, ZoneKindType} from "entities/game/types.ts";
import {canMoveCard} from "store/features/game/helpers.ts";
import {resolveAttack} from "store/features/game/attack.ts";

// Pointer drops must actually hit a target; never snap an outside drop to the nearest zone.
export const cardCollisionDetection: CollisionDetection = (args) => {
    const collisions = args.pointerCoordinates ? pointerWithin(args) : rectIntersection(args);
    const cards = collisions.filter(item => !["dungeon", "discard", "room", "weapons", "potions", "crypt"].includes(String(item.id)));
    return cards.length ? cards : collisions;
};

export const getCardMove = (state: GameStateType, cardId: string, targetId: string): MoveCardPayloadType | undefined => {
    const zones = Object.values(state.zones);
    const emptyZone = zones.find(zone =>
        (zone.type === "weapons" || zone.type === "potions") &&
        Array.from({length: Math.max(0, zone.capacity - zone.cards.length)}, (_, index) =>
            `${zone.type}:empty:${zone.cards.length + index}`).includes(targetId));
    if (emptyZone) targetId = emptyZone.type;
    const from = zones.find(zone => zone.cards.some(card => card.id === cardId))?.type;
    const to = zones.find(zone => zone.type === targetId || zone.cards.some(card => card.id === targetId))?.type;
    if (!from || !to || !(["room", "weapons", "potions"] as ZoneKindType[]).includes(from)) return;
    if (to === "dungeon" || to === "discard") return;
    if (from === "room" && to === "weapons" && state.zones.room.cards.some(card => card.id === cardId && card.role === "enemy")) {
        const target = state.zones.weapons.cards.find(card => card.id === targetId);
        if (!target || (target.role !== "weapon" && target.role !== "fist")) return;
    }
    if (from === "weapons" && to === "room" && state.zones.weapons.cards.some(card => card.id === cardId && (card.role === "weapon" || card.role === "fist"))) {
        const target = state.zones.room.cards.find(card => card.id === targetId);
        if (target?.role !== "enemy") return;
    }
    return {cardId, from, to, targetCardId: to === targetId ? undefined : targetId};
};

export const canDropCardOnTarget = (state: GameStateType, cardId: string, targetId: string): boolean => {
    if (cardId === targetId) return false;
    const move = getCardMove(state, cardId, targetId);
    if (!move || !move.targetCardId || !canMoveCard(state, move)) return false;
    const card = state.zones[move.from].cards.find(item => item.id === cardId);
    const target = state.zones[move.to].cards.find(item => item.id === targetId);
    if (!card || !target) return false;
    if (card.role === "enemy" && move.to === "weapons") {
        return !!resolveAttack(state, target.id, card.id);
    }
    if ((card.role === "weapon" || card.role === "fist") && move.from === "weapons" && move.to === "room") {
        return target.role === "enemy" && !!resolveAttack(state, card.id, target.id);
    }
    return true;
};
