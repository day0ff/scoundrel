import assert from "node:assert/strict";
import {getSeededRandom} from "helpers/getSeededRandom.ts";
import {initPasteboard} from "entities/pasteboards/constants.ts";
import {roomEntryPhase} from "entities/phases/roomEntry.ts";
import {createGame} from "./helpers.ts";
import {applyAttack, resolveAttack} from "./attack.ts";
import {resolvePasteboardActions} from "./card-actions.ts";

export const runAssassinTests = () => {
    for (const useWeapon of [false, true]) {
        const game = createGame([], getSeededRandom("ASSASSIN"));
        const assassin = initPasteboard("day0ff:pasteboard-dark.F.assassin");
        const fist = initPasteboard("day0ff:pasteboard-fist.0");
        const weapon = initPasteboard("day0ff:pasteboard-weapon.4");
        game.zones.room.cards = [assassin];
        game.zones.dungeon.cards = [initPasteboard("day0ff:pasteboard-dark.2")];
        game.zones.weapons.cards = useWeapon ? [fist, weapon] : [fist];
        const previousKill = {id: "previous", identifier: "day0ff:pasteboard-dark.2" as const, rank: "2" as const, strength: 2};
        weapon.killedEnemies = [previousKill];
        const health = game.hero.health.current;
        resolvePasteboardActions(game, roomEntryPhase.identifier, [assassin]);
        const event = game.animationEvents[0];
        assert.ok(event.animation === "day0ff:animation-attack");
        assert.ok(event.instantAttack?.soundUrl.endsWith("/sounds/call-2.mp3"));
        assert.equal(event.attackerId, useWeapon ? weapon.id : fist.id);
        assert.equal(event.enemyId, assassin.id);
        assert.equal(game.hero.health.current, Math.max(game.hero.health.min, health - (10 - (useWeapon ? 4 : 0))));
        assert.ok(game.zones.room.cards.some(card => card.id === assassin.id));
        assert.ok(!game.zones.crypt.cards.some(card => card.id === assassin.id));
        assert.deepEqual(weapon.killedEnemies, [previousKill]);
        assert.equal(game.roomProgress?.cardsPlayed ?? 0, 0);
        game.currentPhase = game.phaseLifecycle.waitingPhase;
        if (useWeapon) assert.equal(resolveAttack(game, weapon.id, assassin.id), undefined);
        applyAttack(game, fist.id, assassin.id);
        assert.ok(!game.zones.room.cards.some(card => card.id === assassin.id));
        assert.ok(game.zones.crypt.cards.some(card => card.id === assassin.id));
    }
    return ["Assassin survives instant attacks, bypasses kill restrictions only on entry, and can be killed normally"];
};
