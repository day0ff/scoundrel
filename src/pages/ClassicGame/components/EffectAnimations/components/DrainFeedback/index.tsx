import {useEffect, useLayoutEffect, useRef, useState, type FC} from "react";
import Card from "components/Card";
import PasteboardCardMark from "components/PasteboardCard/components/PasteboardCardMark";
import {useAudioManager} from "hooks/useAudioManager.ts";
import type {SoundPlaybackType} from "utils/AudioManager/types.ts";
import {POP_SOUNDS, DRAIN_SOUNDS, GATHER_DURATION_MS, CRYPT_FLIGHT_DURATION_MS, DRAIN_SPELL_SOUND} from "./constants.ts";
import {DrainLayerStyled, DrainCardsStyled, DrainPotionStyled, DrainFlightStyled, DrainSteamStyled} from "./styles.ts";
import type {DrainFeedbackPropsType} from "./types.ts";

const DrainFeedback: FC<DrainFeedbackPropsType> = ({event, duration}) => {
    const audio = useAudioManager();
    const cards = useRef<HTMLDivElement>(null);
    const gatherDuration = Math.min(GATHER_DURATION_MS, duration * 0.25);
    const [potions] = useState(() => [...event.roomBefore, ...event.potionsBefore]
        .filter(card => event.potionIds.includes(card.id)));
    const [sounds] = useState(() => ({
        pops: event.potionIds.map(() => ({url: POP_SOUNDS[Math.floor(Math.random() * POP_SOUNDS.length)], delay: Math.random() * 200})),
        drain: DRAIN_SOUNDS[Math.floor(Math.random() * DRAIN_SOUNDS.length)],
    }));
    const [particles] = useState(() => Array.from({length: 36}, (_, index) => ({
        x: 20 + Math.random() * 60,
        y: 40 + Math.random() * 20,
        size: 12 + Math.random() * 24,
        delay: 0.4 + index / 36 * 0.2,
        drift: (Math.random() - 0.5) * 120,
    })));

    useEffect(() => {
        let cancelled = false;
        const playbacks: SoundPlaybackType[] = [];
        const timers: ReturnType<typeof setTimeout>[] = [];
        const play = async (url: string) => {
            if (cancelled) return;
            const playback = await audio.playSound({url});
            if (playback) {
                if (cancelled) playback.stop();
                else playbacks.push(playback);
            }
        };
        void Promise.resolve().then(async () => {
            if (cancelled) return;
            void play(DRAIN_SPELL_SOUND).catch((error: unknown) => console.warn("Unable to play drain spell sound", error));
            const buffers = await Promise.all(sounds.pops.map(pop => audio.preloadSound(pop.url)));
            await audio.preloadSound(sounds.drain);
            if (cancelled) return;
            for (const pop of sounds.pops) {
                timers.push(setTimeout(() => {
                    void play(pop.url).catch((error: unknown) => console.warn("Unable to play potion opening sound", error));
                }, gatherDuration + pop.delay));
            }
            const openingEnd = Math.max(0, ...sounds.pops.map((pop, index) => pop.delay + buffers[index].duration * 1000));
            timers.push(setTimeout(() => {
                void play(sounds.drain).catch((error: unknown) => console.warn("Unable to play drain sound", error));
            }, gatherDuration + openingEnd));
        }).catch((error: unknown) => console.warn("Unable to load potion sounds", error));
        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
            playbacks.forEach(playback => playback.stop());
        };
    }, [audio, sounds, gatherDuration]);

    useLayoutEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const crypt = document.querySelector<HTMLElement>('[data-zone="crypt"] [data-deck-stack]')?.getBoundingClientRect();
        const arrivalOffset = gatherDuration / duration;
        const departureOffset = Math.max(arrivalOffset, 1 - CRYPT_FLIGHT_DURATION_MS / duration);
        const cleanups = event.potionIds.map((id, index) => {
            const card = document.querySelector<HTMLElement>(`[data-card-zone] [data-card-id="${CSS.escape(id)}"]`);
            if (!card) return () => {};
            const target = cards.current?.children[index] as HTMLElement | undefined;
            const origin = card.getBoundingClientRect();
            const destination = target?.getBoundingClientRect();
            let flight: Animation | undefined;
            if (target && destination && destination.width && destination.height && !reducedMotion) {
                const dx = origin.left - destination.left;
                const dy = origin.top - destination.top;
                const scaleX = origin.width / destination.width;
                const scaleY = origin.height / destination.height;
                const cryptScale = crypt ? Math.min(crypt.width / destination.width, crypt.height / destination.height) * 0.35 : 0.1;
                const cryptX = crypt ? crypt.left + crypt.width / 2 - destination.left - destination.width * cryptScale / 2 : 0;
                const cryptY = crypt ? crypt.top + crypt.height / 2 - destination.top - destination.height * cryptScale / 2 : 0;
                flight = target.animate([
                    {transform: `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`, filter: "drop-shadow(0 0 0 transparent)"},
                    {offset: arrivalOffset * 0.75, transform: "translate(0, -8px) scale(1.03)", filter: "drop-shadow(0 0 20px #87ceebaa)"},
                    {offset: arrivalOffset, transform: "translate(0, 0) scale(1)", opacity: 1, filter: "drop-shadow(0 0 12px #87ceeb66)"},
                    {offset: departureOffset, transform: "translate(0, 0) scale(1)", opacity: 1, filter: "drop-shadow(0 0 12px #87ceeb66)"},
                    {offset: 0.97, transform: `translate(${cryptX}px, ${cryptY}px) scale(${cryptScale})`, opacity: 0.85, filter: "drop-shadow(0 0 4px #87ceeb66)"},
                    {transform: `translate(${cryptX}px, ${cryptY}px) scale(${cryptScale * 0.8})`, opacity: 0, filter: "drop-shadow(0 0 0 transparent)"},
                ], {duration, easing: "linear", fill: "both"});
            }
            const visibility = card.style.visibility;
            card.style.visibility = "hidden";
            return () => { flight?.cancel(); card.style.visibility = visibility; };
        });
        return () => cleanups.forEach(cleanup => cleanup());
    }, [event, gatherDuration, duration]);

    return (
        <DrainLayerStyled $duration={duration} aria-hidden="true">
            <DrainCardsStyled ref={cards} $columns={Math.min(potions.length, 5)}>
                {potions.map(potion => (
                    <DrainFlightStyled key={potion.id}>
                    <DrainPotionStyled $duration={duration - gatherDuration - CRYPT_FLIGHT_DURATION_MS} $delay={gatherDuration}>
                        <Card {...potion.card} $size={6}
                            mark={<PasteboardCardMark suit={potion.suit} rank={potion.rank} color={potion.card.color}/>}/>
                    </DrainPotionStyled>
                    </DrainFlightStyled>
                ))}
            </DrainCardsStyled>
            {particles.map((particle, index) => (
                <DrainSteamStyled key={index} $x={particle.x} $y={particle.y} $size={particle.size}
                    $delay={particle.delay * duration} $duration={duration * 0.48} $drift={particle.drift}/>
            ))}
        </DrainLayerStyled>
    );
};

export default DrainFeedback;
