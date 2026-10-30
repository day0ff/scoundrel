import assert from "node:assert/strict";
import {createServer} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const server = await createServer({
    configFile: false,
    plugins: [tsconfigPaths()],
    server: {middlewareMode: true, ws: false},
    appType: "custom",
});
const original = {document: globalThis.document, window: globalThis.window, CSS: globalThis.CSS};
try {
    const {animatePasteboardAction} = await server.ssrLoadModule("/src/utils/animatePasteboardAction.ts");
    const calls = [];
    const record = (frames, options) => {
        const animation = {frames, options, cancel() { this.cancelled = true; }};
        calls.push(animation);
        return animation;
    };
    // The runner must work without a skeleton suit or any suit metadata.
    const card = {animate: record, querySelectorAll: () => [{animate: record}, {animate: record}]};
    globalThis.document = {querySelector: () => ({closest: () => card})};
    globalThis.CSS = {escape: value => value};
    let reduced = false;
    globalThis.window = {matchMedia: () => ({matches: reduced})};

    const effects = animatePasteboardAction("dark-lord", {
        borderColor: "crimson", glowColor: "purple", shake: true, swing: true,
    }, 2100);
    assert.equal(effects.length, 4);
    assert.equal(calls[0].frames[0].backgroundColor, "crimson");
    assert.equal(calls[0].options.pseudoElement, "::after");
    assert.match(calls[2].frames[1].filter, /purple/);
    assert.equal(calls[3].frames[0].transform, "translateX(0px) rotate(0deg)");
    assert.equal(calls[3].frames.at(-1).transform, "translateX(0px) rotate(0deg)");
    assert.ok(calls[3].frames.some(frame => frame.transform !== calls[3].frames[0].transform));
    assert.ok(calls.every(call => call.options.duration === 2100));
    effects.forEach(effect => effect.cancel());
    assert.ok(effects.every(effect => effect.cancelled));
    assert.deepEqual(animatePasteboardAction("dark-lord", undefined, 2100), []);
    assert.deepEqual(animatePasteboardAction("dark-lord", {}, 2100), []);
    reduced = true;
    const accessible = animatePasteboardAction("dark-lord", {
        borderColor: "crimson", glowColor: "purple", shake: true, swing: true,
    }, 2100);
    assert.equal(accessible.length, 3);
    globalThis.document.querySelector = () => null;
    assert.deepEqual(animatePasteboardAction("gone", {shake: true}, 2100), []);
    console.log("PASS configurable colors, combined motion, duration, cleanup, reduced motion, and missing cards");

    const {initPasteboard} = await server.ssrLoadModule("/src/entities/pasteboards/constants.ts");
    const {createGame} = await server.ssrLoadModule("/src/store/features/game/helpers.ts");
    const {resolvePasteboardActions} = await server.ssrLoadModule("/src/store/features/game/card-actions.ts");
    const settings = {borderColor: "crimson", glowColor: "purple", swing: true};
    const dark = initPasteboard("day0ff:pasteboard-dark.A");
    dark.actions = [{
        id: "raise", phase: "day0ff:phase-roomEntry",
        type: "summonStrongestEnemyFromCrypt", animation: settings,
    }];
    const game = createGame([], () => 0.5);
    game.zones.room.cards = [dark];
    game.zones.crypt.cards = [initPasteboard("day0ff:pasteboard-dark.2")];
    resolvePasteboardActions(game, "day0ff:phase-roomEntry");
    assert.equal(game.animationEvents[0].animationCardId, dark.id);
    assert.deepEqual(game.animationEvents[0].actionAnimation, settings);
    console.log("PASS Dark Lord action settings reach the animation event");

    const {runDrainPotionTests, runEggHatchTests} = await server.ssrLoadModule("/src/store/features/game/card-actions.test.ts");
    for (const name of runDrainPotionTests()) console.log("PASS", name);
    for (const name of runEggHatchTests()) console.log("PASS", name);
} finally {
    Object.assign(globalThis, original);
    await server.close();
}
