import {useEffect, useRef, type FC} from "react";
import {COLOR_CHANGE_TIME, LOGO_AUDIO_URL} from "./constants.ts";
import {CanvasStyled} from "./styles.ts";
import type {AudioWaveformPropsType} from "./types.ts";

const AudioWaveform: FC<AudioWaveformPropsType> = ({onIntroColorChange, onEnded, onError}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const drawingContext = canvas?.getContext("2d");
        if (!canvas || !drawingContext) return;

        const resizeCanvas = () => {
            const width = Math.max(800, Math.round(canvas.getBoundingClientRect().width));
            if (canvas.width !== width) canvas.width = width;
        };
        const resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(canvas);
        resizeCanvas();

        // Each effect owns its media element and graph, including under StrictMode.
        const audio = new Audio(LOGO_AUDIO_URL);
        audio.preload = "auto";
        audio.onended = () => onEnded?.();
        audio.onerror = () => onError?.();
        let audioContext: AudioContext | undefined;
        let analyser: AnalyserNode | undefined;
        let samples: Uint8Array<ArrayBuffer> | undefined;
        let frame = 0;
        let disposed = false;
        let colorChanged = false;
        let started = false;

        const draw = () => {
            if (disposed) return;
            if (analyser && samples) analyser.getByteTimeDomainData(samples);
            drawingContext.clearRect(0, 0, canvas.width, canvas.height);
            drawingContext.lineWidth = 2;
            drawingContext.strokeStyle = getComputedStyle(canvas).color;
            drawingContext.beginPath();
            const count = samples?.length ?? 1;
            for (let index = 0; index < count; index++) {
                const x = index * canvas.width / count;
                const y = (samples ? samples[index] / 128 : 1) * canvas.height / 2;
                if (index === 0) drawingContext.moveTo(x, y);
                else drawingContext.lineTo(x, y);
            }
            drawingContext.lineTo(canvas.width, canvas.height / 2);
            drawingContext.stroke();
            if (!colorChanged && audio.currentTime >= COLOR_CHANGE_TIME) {
                colorChanged = true;
                onIntroColorChange();
            }
            frame = requestAnimationFrame(draw);
        };

        const removeInteractionListeners = () => {
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("keydown", handleInteraction);
        };

        const play = () => {
            if (disposed || started) return;
            if (!audioContext && typeof AudioContext !== "undefined") {
                try {
                    audioContext = new AudioContext();
                    const source = audioContext.createMediaElementSource(audio);
                    analyser = audioContext.createAnalyser();
                    analyser.fftSize = 2048;
                    samples = new Uint8Array(analyser.frequencyBinCount);
                    samples.fill(128);
                    source.connect(analyser);
                    analyser.connect(audioContext.destination);
                } catch {
                    // Audio playback remains available without visualization support.
                }
            }
            const resume = audioContext?.resume() ?? Promise.resolve();
            const playback = audio.play();
            void Promise.all([resume, playback]).then(() => {
                if (disposed) {
                    audio.pause();
                    return;
                }
                started = true;
                removeInteractionListeners();
            }).catch(() => {
                // Audible autoplay can require a user gesture; retry on interaction.
            });
        };

        function handleInteraction(event: MouseEvent | KeyboardEvent) {
            if (event instanceof KeyboardEvent && event.repeat) return;
            play();
        }

        window.addEventListener("click", handleInteraction);
        window.addEventListener("keydown", handleInteraction);
        draw();
        play();

        return () => {
            disposed = true;
            removeInteractionListeners();
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            audio.onended = null;
            audio.onerror = null;
            audio.pause();
            audio.removeAttribute("src");
            audio.load();
            if (audioContext) void audioContext.close().catch(() => undefined);
        };
    }, [onIntroColorChange, onEnded, onError]);

    return <CanvasStyled ref={canvasRef} width={800} height={400} aria-hidden="true"/>;
};

export default AudioWaveform;
