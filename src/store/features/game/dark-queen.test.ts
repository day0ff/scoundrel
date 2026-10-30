import reducer, {startGame} from "./index.ts";
import {createGameLog} from "./log.ts";
import {doesReplayMatchGame} from "./replay.ts";
import assert from "node:assert/strict";
import {BASE_URL} from "constants.ts";
import {getSeededRandom} from "helpers/getSeededRandom.ts";
import {initPasteboard} from "entities/pasteboards/constants.ts";
import {roomEntryPhase} from "entities/phases/roomEntry.ts";
import {createGame} from "./helpers.ts";
import {resolvePasteboardActions} from "./card-actions.ts";
import {activeWeaponBreaksSelector, cryptWithEffectFeedbackSelector} from "./selectors.ts";
import {roomWithAttackFeedbackSelector} from "pages/ClassicGame/components/RoomZone/selectors.ts";
import {weaponsWithAttackFeedbackSelector} from "pages/ClassicGame/components/CardZone/selectors.ts";

export const runDarkQueenTests = () => {
    const queen = initPasteboard("day0ff:pasteboard-dark.Q.darkQueen");
    const roomWeapon = initPasteboard("day0ff:pasteboard-weapon.2");
    const secondRoomWeapon = initPasteboard("day0ff:pasteboard-weapon.3");
    const equipped = initPasteboard("day0ff:pasteboard-weapon.4");
    const secondEquipped = initPasteboard("day0ff:pasteboard-weapon.5");
    const fist = initPasteboard("day0ff:pasteboard-fist.0");
    const potion = initPasteboard("day0ff:pasteboard-heal.2");
    const enemy = initPasteboard("day0ff:pasteboard-dark.2");
    const dungeonWeapon = initPasteboard("day0ff:pasteboard-weapon.6");
    const discardedWeapon = initPasteboard("day0ff:pasteboard-weapon.7");
    const game = createGame([], getSeededRandom("DARK-QUEEN"));
    game.zones.room.cards = [roomWeapon, queen, enemy, secondRoomWeapon, potion];
    game.zones.weapons.cards = [equipped, fist, secondEquipped];
    game.zones.weapons.capacity = 3;
    game.zones.dungeon.cards = [dungeonWeapon];
    game.zones.discard.cards = [discardedWeapon];
    game.selectedCardId = equipped.id;
    const roomBefore = game.zones.room.cards.map(card => card.id);
    const equipmentBefore = game.zones.weapons.cards.map(card => card.id);
    const health = {...game.hero.health};

    resolvePasteboardActions(game, roomEntryPhase.identifier, [queen]);
    assert.deepEqual(game.animationEvents.map(event => event.animation), [
        "day0ff:animation-sound",
        ...Array(4).fill("day0ff:animation-weaponBreak"),
    ]);
    const cry = game.animationEvents[0];
    assert.ok(cry.animation === "day0ff:animation-sound");
    assert.equal(cry.cardId, queen.id);
    assert.deepEqual(cry.weaponBreakIds, game.animationEvents.slice(1).map(event => event.id));
    assert.deepEqual(activeWeaponBreaksSelector.resultFunc(game.animationEvents).map(event => event.weapon.id),
        [roomWeapon.id, secondRoomWeapon.id, equipped.id, secondEquipped.id]);
    assert.equal(cry.url, `${BASE_URL}/sounds/banshee-1.mp3`);
    assert.ok(cry.fog);
    assert.equal(cry.fog.color, "whitesmoke");
    assert.ok(game.animationEvents.every(event => event.fog?.id === cry.fog!.id));
    assert.ok(game.animationEvents.every(event => event.fog?.color === "whitesmoke"));
    assert.deepEqual(cry.actionAnimation, queen.actions?.[0].animation);
    assert.deepEqual(roomWithAttackFeedbackSelector.resultFunc(game)!.cards.map(card => card.id), roomBefore);
    assert.deepEqual(weaponsWithAttackFeedbackSelector.resultFunc(game)!.cards.map(card => card.id), equipmentBefore);
    assert.equal(cryptWithEffectFeedbackSelector.resultFunc(game)!.cards.length, 0);
    assert.deepEqual(game.zones.room.cards, [queen, enemy, potion]);
    assert.deepEqual(game.zones.weapons.cards, [fist]);
    assert.deepEqual(game.zones.dungeon.cards, [dungeonWeapon]);
    assert.deepEqual(game.zones.discard.cards, [discardedWeapon]);
    assert.deepEqual(game.hero.health, health);
    assert.equal(game.selectedCardId, undefined);
    assert.ok(game.zones.crypt.cards.every(card => card.role === "weapon" && card.durability === 0));
    const broken = [roomWeapon, secondRoomWeapon, equipped, secondEquipped];

    game.animationEvents.shift();
    for (const weapon of broken) {
        const event = game.animationEvents[0];
        assert.ok(event.animation === "day0ff:animation-weaponBreak");
        assert.equal(event.weapon.id, weapon.id);
        const roomCard = weapon === roomWeapon || weapon === secondRoomWeapon;
        assert.equal(event.weaponZone, roomCard ? "room" : "weapons");
        const displayed = roomCard ? roomWithAttackFeedbackSelector.resultFunc(game)!
            : weaponsWithAttackFeedbackSelector.resultFunc(game)!;
        assert.ok(displayed.cards.some(card => card.id === weapon.id));
        assert.ok(!cryptWithEffectFeedbackSelector.resultFunc(game)!.cards.some(card => card.id === weapon.id));
        game.animationEvents.shift();
        assert.ok(cryptWithEffectFeedbackSelector.resultFunc(game)!.cards.some(card => card.id === weapon.id));
    }
    assert.deepEqual(roomWithAttackFeedbackSelector.resultFunc(game)!.cards, [queen, enemy, potion]);
    assert.deepEqual(weaponsWithAttackFeedbackSelector.resultFunc(game)!.cards, [fist]);

    const empty = createGame([], getSeededRandom("NO-WEAPONS"));
    const otherQueen = initPasteboard(queen.identifier);
    empty.zones.room.cards = [otherQueen];
    resolvePasteboardActions(empty, roomEntryPhase.identifier, [otherQueen]);
    assert.deepEqual(empty.animationEvents.map(event => event.animation), ["day0ff:animation-sound"]);
    assert.equal(empty.zones.crypt.cards.length, 0);
    assert.equal(empty.animationEvents[0].fog?.color, "whitesmoke");
    assert.notEqual(empty.animationEvents[0].fog?.id, cry.fog.id);
    const initial = createGame([], getSeededRandom("DARK-QUEEN-REPLAY"));
    initial.started = false;
    initial.zones.dungeon.cards = [
        initPasteboard("day0ff:pasteboard-dark.Q.darkQueen"),
        initPasteboard("day0ff:pasteboard-weapon.2"),
    ];
    initial.zones.weapons.cards = [initPasteboard("day0ff:pasteboard-weapon.3")];
    initial.log = createGameLog(initial, "newGame");
    const replayed = reducer(initial, startGame())!;
    assert.ok(replayed.animationEvents.some(event => event.animation === "day0ff:animation-sound"));
    assert.equal(replayed.animationEvents.filter(event => event.animation === "day0ff:animation-weaponBreak").length, 2);
    assert.ok(doesReplayMatchGame(replayed.log!, replayed));
    const plain = createGame([], getSeededRandom("NO-FOG"));
    const plainQueen = initPasteboard("day0ff:pasteboard-dark.Q.darkQueen");
    plainQueen.actions = [{
        id: "breakAllWeapons",
        phase: roomEntryPhase.identifier,
        type: "breakAllWeapons",
        soundUrl: `${BASE_URL}/sounds/banshee-1.mp3`,
    }];
    plain.zones.room.cards = [plainQueen, initPasteboard("day0ff:pasteboard-weapon.2")];
    resolvePasteboardActions(plain, roomEntryPhase.identifier, [plainQueen]);
    assert.ok(plain.animationEvents.every(event => event.fog === undefined));
    return [
        "Dark Queen groups the cry and every room/equipped weapon break for concurrent playback",
        "Dark Queen leaves fists, potions, enemies and weapons outside the room/equipment alone and cries with no targets",
        "Dark Queen room-entry weapon destruction replays exactly",
        "fog is grouped across the cry and all weapon breaks, with optional configuration and distinct action IDs",
    ];
};
