import type {PlaySoundOptionsType, SoundPlaybackType} from "./types.ts";

const normalizeVolume = (volume: number): number => {
    if (!Number.isFinite(volume)) throw new RangeError("Sound volume must be finite");
    return Math.min(1, Math.max(0, volume));
};

export class AudioManager {
    private context: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private buffers = new Map<string, AudioBuffer>();
    private pending = new Map<string, Promise<AudioBuffer>>();
    private requests = new Set<AbortController>();
    private playbacks = new Set<SoundPlaybackType>();
    private volume = 1;
    private enabled = true;
    private disposed = false;
    private playbackGeneration = 0;

    private getContext(): AudioContext {
        if (this.disposed) throw new Error("AudioManager has been disposed");
        if (!this.context) {
            this.context = new AudioContext();
            this.masterGain = this.context.createGain();
            this.masterGain.gain.value = this.enabled ? this.volume : 0;
            this.masterGain.connect(this.context.destination);
        }
        return this.context;
    }

    /** Call directly from a click or keyboard gesture before awaiting other work. */
    async unlock(): Promise<boolean> {
        const context = this.getContext();
        try {
            if (context.state !== "running") await context.resume();
            return !this.disposed && context.state === "running";
        } catch {
            return false;
        }
    }

    preloadSound(url: string): Promise<AudioBuffer> {
        const context = this.getContext();
        const cached = this.buffers.get(url);
        if (cached) return Promise.resolve(cached);
        const pending = this.pending.get(url);
        if (pending) return pending;
        const controller = new AbortController();
        this.requests.add(controller);
        const request = (async () => {
            try {
                const response = await fetch(url, {signal: controller.signal});
                if (!response.ok) throw new Error(`Failed to load sound ${url}: ${response.status}`);
                const buffer = await context.decodeAudioData(await response.arrayBuffer());
                if (this.disposed) throw new Error("AudioManager has been disposed");
                this.buffers.set(url, buffer);
                return buffer;
            } finally {
                this.pending.delete(url);
                this.requests.delete(controller);
            }
        })();
        this.pending.set(url, request);
        return request;
    }

    async preload(urls: readonly string[]): Promise<void> {
        await Promise.all(urls.map((url) => this.preloadSound(url)));
    }

    /** Blocked or muted requests are discarded, rather than queued for later. */
    async playSound({url, loop = false, volume = 1}: PlaySoundOptionsType): Promise<SoundPlaybackType | null> {
        const context = this.getContext();
        const gainValue = normalizeVolume(volume);
        if (!this.enabled || this.volume === 0 || context.state !== "running") return null;
        const generation = this.playbackGeneration;
        const buffer = await this.preloadSound(url);
        if (this.disposed || generation !== this.playbackGeneration || !this.enabled || this.volume === 0 || context.state !== "running") return null;
        const source = context.createBufferSource();
        const gain = context.createGain();
        source.buffer = buffer;
        source.loop = loop;
        gain.gain.value = gainValue;
        source.connect(gain);
        gain.connect(this.masterGain!);
        let finished = false;
        let resolveFinished!: () => void;
        const completion = new Promise<void>(resolve => { resolveFinished = resolve; });
        const cleanup = () => {
            if (finished) return;
            finished = true;
            source.onended = null;
            source.disconnect();
            gain.disconnect();
            this.playbacks.delete(playback);
            resolveFinished();
        };
        const playback: SoundPlaybackType = {
            durationMs: buffer.duration * 1000,
            finished: completion,
            stop: () => {
                if (finished) return;
                try {
                    source.stop();
                } finally {
                    cleanup();
                }
            },
        };
        source.onended = cleanup;
        this.playbacks.add(playback);
        try {
            source.start();
        } catch (error) {
            cleanup();
            throw error;
        }
        return playback;
    }

    setVolume(volume: number): void {
        this.volume = normalizeVolume(volume);
        if (this.volume === 0) this.playbackGeneration++;
        this.updateMasterGain();
    }

    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
        if (!enabled) this.playbackGeneration++;
        this.updateMasterGain();
    }

    private updateMasterGain(): void {
        if (this.context && this.masterGain) {
            this.masterGain.gain.setValueAtTime(this.enabled ? this.volume : 0, this.context.currentTime);
        }
    }

    stopAll(): void {
        this.playbackGeneration++;
        for (const playback of this.playbacks) playback.stop();
    }

    /** Terminal cleanup; use stopAll to stop sounds while keeping the cache. */
    async dispose(): Promise<void> {
        if (this.disposed) return;
        this.disposed = true;
        this.stopAll();
        for (const controller of this.requests) controller.abort();
        this.requests.clear();
        this.pending.clear();
        this.buffers.clear();
        this.masterGain?.disconnect();
        if (this.context && this.context.state !== "closed") await this.context.close();
    }
}

// Creating the shared manager does not create a browser audio context.
export const audioManager = new AudioManager();
