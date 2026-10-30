import type {AnimationFogType} from "entities/animations/types.ts";
import type {GameStateType} from "entities/game/types.ts";
import {weaponBreakAnimation} from "entities/animations/weaponBreak.ts";

// Reusable by attacks and future card actions. UI selectors retain the weapon until feedback ends.
export const breakWeapon = (state: GameStateType, weaponId: string, fog?: AnimationFogType) => {
    const zone = [state.zones.weapons, state.zones.room]
        .find(zone => zone.cards.some(card => card.id === weaponId && card.role === "weapon"));
    if (!zone) return;
    const index = zone.cards.findIndex(card => card.id === weaponId && card.role === "weapon");
    if (index === -1) return;
    const weapon = zone.cards[index];
    weapon.durability = 0;
    const roomBefore = zone.type === "room" ? state.zones.room.cards.map(card => ({...card})) : undefined;
    zone.cards.splice(index, 1);
    state.animationEvents.push({
        id: ++state.animationSequence,
        animation: weaponBreakAnimation.identifier,
        fog,
        weapon: {...weapon},
        weaponZoneIndex: index,
        weaponZone: zone === state.zones.room ? "room" : "weapons",
        roomBefore,
        healthBefore: {...state.hero.health},
        healthAfter: {...state.hero.health},
    });
    state.zones.crypt.cards.push(weapon);
    if (state.selectedCardId === weaponId) state.selectedCardId = undefined;
};
