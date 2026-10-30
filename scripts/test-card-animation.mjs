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
    const {runDarkQueenTests} = await server.ssrLoadModule("/src/store/features/game/dark-queen.test.ts");
    for (const name of runDarkQueenTests()) console.log("PASS", name);
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

    const {runDrainPotionTests, runEggHatchTests, runDarkDragonHatchTests, runDarkLordCallTests} = await server.ssrLoadModule("/src/store/features/game/card-actions.test.ts");
    for (const name of runDrainPotionTests()) console.log("PASS", name);
    for (const name of runEggHatchTests()) console.log("PASS", name);
    for (const name of runDarkDragonHatchTests()) console.log("PASS", name);
    for (const name of runDarkLordCallTests()) console.log("PASS", name);
    const {CALL_SOUND} = await server.ssrLoadModule("/src/pages/ClassicGame/components/EffectAnimations/components/CallFeedback/constants.ts");
    const {BASE_URL} = await server.ssrLoadModule("/src/constants.ts");
    assert.equal(CALL_SOUND, `${BASE_URL}/sounds/call-1.mp3`);
    const {getCallFlightFrames} = await server.ssrLoadModule("/src/pages/ClassicGame/components/EffectAnimations/components/CallFeedback/helpers.ts");
    const flight = getCallFlightFrames({left: 300, top: 200, width: 100, height: 150}, 1280);
    assert.match(flight[0].transform, /translate\(1180px, -500px\)/);
    assert.match(flight[1].filter, /whitesmoke/);
    assert.equal(flight.at(-1).transform, "translate(0, 0) scale(1) rotate(0deg)");
    console.log("PASS call flight begins outside the viewport and lands in the room slot");
    const {runWeaponBreakTests} = await server.ssrLoadModule("/src/store/features/game/weapon-break.test.ts");
    for (const name of runWeaponBreakTests()) console.log("PASS", name);
    const {WEAPON_BREAK_SOUNDS} = await server.ssrLoadModule("/src/pages/ClassicGame/components/EffectAnimations/components/WeaponBreakFeedback/constants.ts");
    assert.deepEqual(WEAPON_BREAK_SOUNDS, [`${BASE_URL}/sounds/sword-break-1.mp3`, `${BASE_URL}/sounds/sword-break-2.mp3`]);
    const {getWeaponBreakFrames, getWeaponCryptFlightFrames} = await server.ssrLoadModule("/src/pages/ClassicGame/components/EffectAnimations/components/WeaponBreakFeedback/helpers.ts");
    assert.notEqual(getWeaponBreakFrames(-1, false).at(-1).transform, getWeaponBreakFrames(1, false).at(-1).transform);
    assert.equal(getWeaponBreakFrames(-1, true).at(-1).transform, "none");
    const cryptFlight = getWeaponCryptFlightFrames(
        {left: 100, top: 100, width: 100, height: 150},
        {left: 500, top: 400, width: 100, height: 150},
        1, false,
    );
    assert.match(cryptFlight.at(-1).transform, /translate\(400px, 300px\)/);
    assert.equal(cryptFlight.at(-1).opacity, 0);
    console.log("PASS break fragments separate, respect reduced motion, and move toward the crypt");
    const {getWeaponBreakTiming} = await server.ssrLoadModule("/src/pages/ClassicGame/components/EffectAnimations/components/WeaponBreakGroupFeedback/helpers.ts");
    for (const count of [1, 4, 64]) {
        for (let index = 0; index < count; index++) {
            const timing = getWeaponBreakTiming(index, count);
            assert.ok(timing.startDelayMs >= 300);
            assert.ok(timing.startDelayMs + timing.crackDurationMs <= 500);
        }
    }
    console.log("PASS grouped weapons wait 300ms and finish cracking by 500ms, including overflow rooms");


} finally {
    Object.assign(globalThis, original);
    await server.close();
}
