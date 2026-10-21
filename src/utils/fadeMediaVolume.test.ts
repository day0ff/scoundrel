import assert from "node:assert/strict";
import {fadeMediaVolume} from "./fadeMediaVolume.ts";

export const runMediaVolumeFadeTests = () => {
    const passed: string[] = [];
    const originalPerformance = globalThis.performance;
    const originalRequest = globalThis.requestAnimationFrame;
    const originalCancel = globalThis.cancelAnimationFrame;
    const frames = new Map<number, FrameRequestCallback>();
    let now = 0;
    let nextId = 0;

    globalThis.performance = {now: () => now} as Performance;
    globalThis.requestAnimationFrame = callback => {
        const id = ++nextId;
        frames.set(id, callback);
        return id;
    };
    globalThis.cancelAnimationFrame = id => { frames.delete(id); };
    const advance = (duration: number) => {
        now += duration;
        for (const [id, callback] of [...frames]) {
            frames.delete(id);
            callback(now);
        }
    };
    const check = (name: string, run: () => void) => {
        run();
        assert.equal(frames.size, 0, "Finished or canceled fades must leave no pending frames");
        passed.push(name);
    };

    try {
        check("playing media fades to silence over the curtain duration", () => {
            const media = {volume: 1};
            fadeMediaVolume(media, 0, 450);
            assert.equal(media.volume, 1);
            advance(225);
            assert.equal(media.volume, 0.5);
            advance(225);
            assert.equal(media.volume, 0);
        });

        check("incoming music fades back to its configured volume", () => {
            const media = {volume: 0};
            fadeMediaVolume(media, 0.5, 450);
            advance(225);
            assert.equal(media.volume, 0.25);
            advance(225);
            assert.equal(media.volume, 0.5);
        });

        check("rapidly reversed fades continue from the current volume", () => {
            const media = {volume: 1};
            const cancel = fadeMediaVolume(media, 0, 450);
            advance(225);
            cancel();
            fadeMediaVolume(media, 1, 450);
            assert.equal(media.volume, 0.5);
            advance(225);
            assert.equal(media.volume, 0.75);
            advance(225);
            assert.equal(media.volume, 1);
        });

        check("unmount cleanup cancels pending volume changes", () => {
            const media = {volume: 1};
            const cancel = fadeMediaVolume(media, 0, 450);
            advance(100);
            const volume = media.volume;
            cancel();
            advance(450);
            assert.equal(media.volume, volume);
        });

        check("immediate fades and unchanged volume do not schedule frames", () => {
            const media = {volume: 1};
            fadeMediaVolume(media, 0, 0);
            assert.equal(media.volume, 0);
            fadeMediaVolume(media, 0, 450);
        });
    } finally {
        globalThis.performance = originalPerformance;
        globalThis.requestAnimationFrame = originalRequest;
        globalThis.cancelAnimationFrame = originalCancel;
    }

    return passed;
};
