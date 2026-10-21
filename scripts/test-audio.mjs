import assert from 'node:assert/strict';
import {AudioManager} from '../src/utils/AudioManager/index.ts';

class Node {
    disconnected = false;
    connect() {}
    disconnect() { this.disconnected = true; }
}
class Gain extends Node {
    gain = {value: 1, setValueAtTime(value) { this.value = value; }};
}
class Source extends Node {
    stops = 0;
    start() { this.started = true; }
    stop() { this.stops++; this.onended?.(); }
}
class Context {
    static instances = [];
    state = 'suspended';
    currentTime = 0;
    destination = {};
    gains = [];
    sources = [];
    decodes = 0;
    constructor() { Context.instances.push(this); }
    createGain() { const gain = new Gain(); this.gains.push(gain); return gain; }
    createBufferSource() { const source = new Source(); this.sources.push(source); return source; }
    async decodeAudioData() { this.decodes++; return {}; }
    async resume() { this.state = 'running'; }
    async close() { this.state = 'closed'; }
}
const originalContext = globalThis.AudioContext;
const originalFetch = globalThis.fetch;
try {
    globalThis.AudioContext = Context;
    let loads = 0;
    globalThis.fetch = async () => {
        loads++;
        return {ok: true, arrayBuffer: async () => new ArrayBuffer(1)};
    };
    const audio = new AudioManager();
    assert.equal(Context.instances.length, 0);
    await audio.preload(['impact', 'impact']);
    const context = Context.instances[0];
    assert.equal(loads, 1);
    assert.equal(context.decodes, 1);
    assert.equal(await audio.playSound({url: 'impact'}), null);
    await audio.unlock();
    const first = await audio.playSound({url: 'impact'});
    await audio.playSound({url: 'impact', loop: true, volume: 0.25});
    assert.equal(context.sources.length, 2);
    assert.equal(context.sources[1].loop, true);
    assert.equal(context.gains[2].gain.value, 0.25);
    assert.equal(loads, 1);
    audio.setVolume(0.4);
    audio.setEnabled(false);
    assert.equal(context.gains[0].gain.value, 0);
    assert.equal(await audio.playSound({url: 'impact'}), null);
    audio.setEnabled(true);
    assert.equal(context.gains[0].gain.value, 0.4);
    first.stop(); first.stop();
    assert.equal(context.sources[0].stops, 1);
    assert.equal(context.sources[0].disconnected, true);
    context.sources[1].onended();
    assert.equal(context.sources[1].disconnected, true);
    assert.equal(context.gains[2].disconnected, true);
    audio.stopAll();
    assert.equal(context.sources[1].stops, 0);
    console.log('PASS lazy initialization, deduplicated cache, overlapping playback, volume, mute, and cleanup');

    let attempts = 0;
    globalThis.fetch = async () => ({ok: ++attempts > 1, status: 503, arrayBuffer: async () => new ArrayBuffer(1)});
    await assert.rejects(audio.preloadSound('retry'), /503/);
    await audio.preloadSound('retry');
    assert.equal(attempts, 2);
    console.log('PASS failed loads can be retried');

    let release;
    globalThis.fetch = () => new Promise(resolve => {
        release = () => resolve({ok: true, arrayBuffer: async () => new ArrayBuffer(1)});
    });
    const pending = audio.playSound({url: 'slow'});
    audio.stopAll();
    release();
    assert.equal(await pending, null);
    assert.equal(context.sources.length, 2);
    console.log('PASS stopAll cancels pending playback');

    let signal;
    globalThis.fetch = (_url, options) => {
        signal = options.signal;
        return new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(new Error('aborted'))));
    };
    const loading = audio.preloadSound('dispose');
    const rejected = assert.rejects(loading, /aborted/);
    await audio.dispose();
    await rejected;
    assert.equal(signal.aborted, true);
    assert.equal(context.state, 'closed');
    await assert.rejects(audio.playSound({url: 'impact'}), /disposed/);
    await audio.dispose();
    console.log('PASS disposal aborts loading and closes the context');
} finally {
    globalThis.AudioContext = originalContext;
    globalThis.fetch = originalFetch;
}
