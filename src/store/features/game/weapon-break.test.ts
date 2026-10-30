import reducer, {attackCard, completeEffectAnimation} from "./index.ts";
import {createGameLog} from "./log.ts";
import {doesReplayMatchGame} from "./replay.ts";
import assert from "node:assert/strict";
import {getSeededRandom} from "helpers/getSeededRandom.ts";
import {initPasteboard} from "entities/pasteboards/constants.ts";
import {createGame} from "./helpers.ts";
import {applyAttack} from "./attack.ts";
import {breakWeapon} from "./weapon-break.ts";
import {cryptWithEffectFeedbackSelector, isConsumingGameSelector} from "./selectors.ts";
import {weaponsWithAttackFeedbackSelector} from "pages/ClassicGame/components/CardZone/selectors.ts";
import type {RootState} from "store/types.ts";

export const runWeaponBreakTests = () => {
    for (const durability of [1, 2]) {
        const game = createGame([], getSeededRandom("WEAPON-BREAK"));
        const first = initPasteboard("day0ff:pasteboard-weapon.3");
        const weapon = {...initPasteboard("day0ff:pasteboard-weapon.2"), durability};
        const enemy = initPasteboard("day0ff:pasteboard-skeleton.2");
        game.currentPhase = game.phaseLifecycle.waitingPhase;
        game.zones.weapons.cards = [first, weapon];
        game.zones.room.cards = [enemy, initPasteboard("day0ff:pasteboard-skeleton.3")];
        game.selectedCardId = weapon.id;
        applyAttack(game, weapon.id, enemy.id);
        if (durability > 1) {
            assert.equal(game.zones.weapons.cards[1].durability, 1);
            assert.deepEqual(game.animationEvents.map(event => event.animation), ["day0ff:animation-attack"]);
            continue;
        }
        assert.deepEqual(game.animationEvents.map(event => event.animation), [
            "day0ff:animation-attack", "day0ff:animation-weaponBreak",
        ]);
        assert.deepEqual(weaponsWithAttackFeedbackSelector.resultFunc(game)!.cards.map(card => card.id), [first.id, weapon.id]);
        assert.equal(weaponsWithAttackFeedbackSelector.resultFunc(game)!.cards[1].durability, 1);
        assert.ok(!cryptWithEffectFeedbackSelector.resultFunc(game)!.cards.some(card => card.id === weapon.id));
        assert.equal(isConsumingGameSelector({game} as RootState), true);
        game.animationEvents.shift();
        const event = game.animationEvents[0];
        assert.ok(event.animation === "day0ff:animation-weaponBreak");
        assert.equal(event.weapon.id, weapon.id);
        assert.equal(event.weapon.durability, 0);
        assert.equal(event.weaponZoneIndex, 1);
        assert.equal(event.weapon.killedEnemies?.[0].id, enemy.id);
        assert.equal(weaponsWithAttackFeedbackSelector.resultFunc(game)!.cards[1].durability, 0);
        assert.ok(!cryptWithEffectFeedbackSelector.resultFunc(game)!.cards.some(card => card.id === weapon.id));
        assert.equal(game.selectedCardId, undefined);
        game.animationEvents.shift();
        assert.deepEqual(weaponsWithAttackFeedbackSelector.resultFunc(game)!.cards.map(card => card.id), [first.id]);
        assert.ok(cryptWithEffectFeedbackSelector.resultFunc(game)!.cards.some(card => card.id === weapon.id));
    }

    const game = createGame([], getSeededRandom("ACTION-WEAPON-BREAK"));
    const weapon = initPasteboard("day0ff:pasteboard-weapon.4");
    const fist = initPasteboard("day0ff:pasteboard-fist.0");
    game.zones.weapons.cards = [weapon, fist];
    const health = {...game.hero.health};
    breakWeapon(game, weapon.id);
    breakWeapon(game, weapon.id);
    breakWeapon(game, fist.id);
    assert.equal(game.animationEvents.length, 1);
    assert.equal(game.zones.crypt.cards.filter(card => card.id === weapon.id).length, 1);
    assert.deepEqual(game.hero.health, health);
    assert.deepEqual(game.zones.weapons.cards, [fist]);
    const initial = createGame([], getSeededRandom("WEAPON-BREAK-REPLAY"));
    initial.started = true;
    initial.currentPhase = initial.phaseLifecycle.waitingPhase;
    initial.zones.weapons.cards = [{...initPasteboard("day0ff:pasteboard-weapon.2"), durability: 1}];
    initial.zones.room.cards = [initPasteboard("day0ff:pasteboard-skeleton.2"), initPasteboard("day0ff:pasteboard-skeleton.3")];
    initial.log = createGameLog(initial, "newGame");
    let replayed = reducer(initial, attackCard({cardId: initial.zones.weapons.cards[0].id, enemyId: initial.zones.room.cards[0].id}))!;
    assert.ok(doesReplayMatchGame(replayed.log!, replayed));
    for (const event of [...replayed.animationEvents]) replayed = reducer(replayed, completeEffectAnimation(event.id))!;
    assert.ok(doesReplayMatchGame(replayed.log!, replayed));
    return [
        "zero durability queues attack then break and retains the weapon outside the visible crypt until feedback completes",
        "break helper supports future actions, ignores fists and prevents duplicate breaks",
        "weapon breaks replay exactly before and after presentation completes",
    ];
};
