import {useEffect, useRef, useState, type FC} from "react";
import {useAudioManager} from "hooks/useAudioManager.ts";
import {useAppDispatch} from "store/hooks.ts";
import {completeEffectAnimation} from "store/features/game";
import type {SoundPlaybackType} from "utils/AudioManager/types.ts";
import {WEAPON_BREAK_CLIPS, WEAPON_BREAK_FLIGHT_MS, WEAPON_BREAK_SOUNDS} from "./constants.ts";
import {getWeaponBreakFrames, getWeaponCryptFlightFrames} from "./helpers.ts";
import {WeaponBreakLayerStyled} from "./styles.ts";
import type {WeaponBreakFeedbackPropsType} from "./types.ts";

const WeaponBreakFeedback: FC<WeaponBreakFeedbackPropsType> = ({event, duration, startDelayMs = 0, crackDurationMs = duration, onComplete}) => {
    const audio = useAudioManager();
    const dispatch = useAppDispatch();
    const layer = useRef<HTMLDivElement>(null);
    const [sound] = useState(() => WEAPON_BREAK_SOUNDS[Math.floor(Math.random() * WEAPON_BREAK_SOUNDS.length)]);

    useEffect(() => {
        let cancelled = false;
        let playback: SoundPlaybackType | null = null;
        let timer: ReturnType<typeof setTimeout> | undefined;
        let card: HTMLElement | null = null;
        let visibility = "";
        const pieces: HTMLElement[] = [];
        const animations: Animation[] = [];
        const wait = (ms: number) => new Promise<void>(resolve => { timer = setTimeout(resolve, ms); });

        // Strict Mode's discarded setup must not play a second sound or create extra fragments.
        void Promise.resolve().then(async () => {
            if (cancelled) return;
            if (startDelayMs) await wait(startDelayMs);
            if (cancelled) return;
            // Start the visual on schedule; loading audio must not delay the crack.
            const soundRequest = audio.playSound({url: sound}).then(sound => {
                playback = sound;
                if (cancelled) sound?.stop();
                return sound;
            }).catch((error: unknown) => {
                console.warn("Unable to play weapon break sound", error);
                return null;
            });
            card = document.querySelector<HTMLElement>(
                `[data-card-zone="${event.weaponZone ?? "weapons"}"] [data-card-id="${CSS.escape(event.weapon.id)}"]`,
            );
            const rect = card?.getBoundingClientRect();
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (card && rect && layer.current) {
                visibility = card.style.visibility;
                for (let index = 0; index < WEAPON_BREAK_CLIPS.length; index++) {
                    const side = index === 0 ? -1 : 1;
                    const piece = card.cloneNode(true) as HTMLElement;
                    piece.removeAttribute("data-card-id");
                    piece.setAttribute("aria-hidden", "true");
                    piece.inert = true;
                    Object.assign(piece.style, {
                        position: "fixed", left: `${rect.left}px`, top: `${rect.top}px`,
                        width: `${rect.width}px`, height: `${rect.height}px`, margin: "0",
                        visibility: "visible", transform: "none", transition: "none",
                        clipPath: WEAPON_BREAK_CLIPS[index], transformOrigin: "center",
                    });
                    layer.current.append(piece);
                    pieces.push(piece);
                    animations.push(piece.animate(getWeaponBreakFrames(side, reduced), {
                        duration: crackDurationMs, easing: "ease-out", fill: "both",
                    }));
                }
                card.style.visibility = "hidden";
            }
            // Finish the chosen sound before sending the pieces to the crypt, even on a cold load.
            await Promise.all([wait(duration), soundRequest.then(sound => sound?.finished)]);
            if (cancelled) return;
            if (rect && pieces.length) {
                const crypt = document.querySelector<HTMLElement>('[data-zone="crypt"] [data-deck-stack]')
                    ?.getBoundingClientRect();
                pieces.forEach((piece, index) => {
                    animations.push(piece.animate(
                        getWeaponCryptFlightFrames(rect, crypt, index === 0 ? -1 : 1, reduced),
                        {duration: WEAPON_BREAK_FLIGHT_MS, easing: "ease-in", fill: "both"},
                    ));
                });
                await wait(WEAPON_BREAK_FLIGHT_MS);
            }
            if (!cancelled) {
                if (onComplete) onComplete(event.id);
                else dispatch(completeEffectAnimation(event.id));
            }
        }).catch((error: unknown) => {
            if (!cancelled) {
                console.warn("Unable to animate weapon break", error);
                if (onComplete) onComplete(event.id);
                else dispatch(completeEffectAnimation(event.id));
            }
        });

        return () => {
            cancelled = true;
            clearTimeout(timer);
            playback?.stop();
            animations.forEach(animation => animation.cancel());
            pieces.forEach(piece => piece.remove());
            if (card) card.style.visibility = visibility;
        };
    }, [audio, dispatch, event.id, event.weapon.id, event.weaponZone, duration, sound, startDelayMs, crackDurationMs, onComplete]);

    return <WeaponBreakLayerStyled ref={layer} aria-hidden="true"/>;
};

export default WeaponBreakFeedback;
