import assert from "node:assert/strict";
import {getSeededRandom} from "helpers/getSeededRandom.ts";
import {initPasteboard} from "entities/pasteboards/constants.ts";
import {roomEntryPhase} from "entities/phases/roomEntry.ts";
import {createGame} from "./helpers.ts";
import {resolvePasteboardActions} from "./card-actions.ts";
import {roomWithAttackFeedbackSelector} from "pages/ClassicGame/components/RoomZone/selectors.ts";

export const runCommanderTests = () => {
    for (const capacity of [1, 4]) {
        const game = createGame([], getSeededRandom("COMMANDER"));
        const commander = initPasteboard("day0ff:pasteboard-dark.F.commander");
        const enemy = initPasteboard("day0ff:pasteboard-dark.2");
        const potion = initPasteboard("day0ff:pasteboard-heal.2");
        game.zones.room.cards = [commander];
        game.zones.room.capacity = capacity;
        game.zones.dungeon.cards = [potion, enemy, initPasteboard("day0ff:pasteboard-dark.3")];
        game.zones.discard.cards = [potion];
        resolvePasteboardActions(game, roomEntryPhase.identifier, [commander]);
        assert.deepEqual(game.zones.room.cards, [commander, enemy]);
        assert.deepEqual(game.zones.discard.cards, [potion]);
        assert.equal(game.zones.dungeon.cards.length, 2);
        assert.equal(game.zones.dungeon.cards[0].id, potion.id);
        assert.equal(game.zones.room.capacity, capacity);
        assert.equal(roomWithAttackFeedbackSelector.resultFunc(game)!.capacity, Math.max(capacity, 2));
        const event = game.animationEvents[0];
        assert.ok(event.animation === "day0ff:animation-call");
        assert.equal(event.summonedId, enemy.id);
        assert.equal(event.sourceZone, "dungeon");
        assert.equal(event.soundWaves, true);
        assert.ok(event.soundUrl?.endsWith("/sounds/call-3.mp3"));
    }
    const game = createGame([], getSeededRandom("COMMANDER-EMPTY"));
    const commander = initPasteboard("day0ff:pasteboard-dark.F.commander");
    game.zones.room.cards = [commander];
    game.zones.discard.cards = [];
    game.zones.dungeon.cards = [];
    resolvePasteboardActions(game, roomEntryPhase.identifier, [commander]);
    assert.deepEqual(game.zones.room.cards, [commander]);
    assert.equal(game.animationEvents.length, 1);
    const event = game.animationEvents[0];
    assert.ok(event.animation === "day0ff:animation-call");
    assert.equal(event.summonedId, undefined);

    // A nonempty dungeon with no enemies does not use discard.
    const older = initPasteboard("day0ff:pasteboard-dark.2");
    const newest = initPasteboard("day0ff:pasteboard-dark.3");
    game.animationEvents = [];
    game.zones.dungeon.cards = [initPasteboard("day0ff:pasteboard-heal.2")];
    game.zones.discard.cards = [older, newest, initPasteboard("day0ff:pasteboard-heal.3")];
    resolvePasteboardActions(game, roomEntryPhase.identifier, [commander]);
    assert.equal(game.zones.room.cards.length, 1);
    game.animationEvents = [];
    game.zones.dungeon.cards = [];
    resolvePasteboardActions(game, roomEntryPhase.identifier, [commander]);
    assert.equal(game.zones.room.cards.at(-1)?.id, newest.id);
    assert.equal(game.zones.discard.cards[0].id, older.id);
    const fallback = game.animationEvents[0];
    assert.ok(fallback.animation === "day0ff:animation-call");
    assert.equal(fallback.sourceZone, "discard");

    // Called enemies retain their own arrival actions.
    game.animationEvents = [];
    game.zones.discard.cards = [initPasteboard("day0ff:pasteboard-dark.F.assassin")];
    game.zones.weapons.cards = [initPasteboard("day0ff:pasteboard-fist.0")];
    resolvePasteboardActions(game, roomEntryPhase.identifier, [commander]);
    assert.deepEqual(game.animationEvents.map(event => event.animation), ["day0ff:animation-call", "day0ff:animation-attack"]);
    return ["Commander pulls the first dungeon enemy, falls back to the latest discarded enemy only for an empty dungeon, and preserves arrival actions"];
};
