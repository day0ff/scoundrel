import assert from "node:assert/strict";
import {initPack} from "./constants.ts";
import {classicPack} from "./classic.ts";

export const runPackTests = () => {
    const first = initPack(classicPack.identifier);
    const second = initPack(classicPack.identifier);
    assert.equal(first.decks.length, 4);
    assert.equal(first.decks.flatMap(deck => deck.pasteboards).length, 46);
    assert.notEqual(first.id, second.id);
    assert.notEqual(first.decks[0].id, second.decks[0].id);
    assert.notEqual(first.decks[0].pasteboards[0].id, second.decks[0].pasteboards[0].id);
    first.decks[0].pasteboards.splice(0);
    assert.equal(second.decks[0].pasteboards.length, 13);
    assert.equal(classicPack.decks[0].cards.length, 13);

    const custom = initPack(classicPack.identifier, [
        {identifier: "day0ff:deck-weapon", cards: ["day0ff:pasteboard-weapon.2", "day0ff:pasteboard-weapon.2"]},
        {identifier: "day0ff:deck-skeleton", cards: []},
        {identifier: "day0ff:deck-healPotions"},
    ]);
    assert.equal(custom.decks[0].pasteboards.length, 2);
    assert.notEqual(custom.decks[0].pasteboards[0].id, custom.decks[0].pasteboards[1].id);
    assert.equal(custom.decks[1].pasteboards.length, 0);
    assert.ok(custom.decks[2].pasteboards.length > 0);
    assert.equal(initPack(classicPack.identifier, []).decks.length, 0);
    return ["packs create independent deck and card instances", "pack overrides support custom, duplicate, empty and default card lists"];
};
