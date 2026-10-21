import {useEffect, useRef, type FC} from "react";
import {useMatch} from "react-router";
import {SOUND_PATHS} from "assets/sounds";
import {useAppSelector} from "store/hooks.ts";
import {musicSettingsSelector} from "store/features/settings/selectors.ts";
import {classicGameOutcomeSelector} from "store/features/classic-game/selectors.ts";
import {usePageTransitionMediaVolume} from "hooks/usePageTransitionMediaVolume.ts";

const BackgroundMusic: FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const {enabled, volume} = useAppSelector(musicSettingsSelector);
    const isClassicGame = useMatch("/classic-game") !== null;
    const outcome = useAppSelector(classicGameOutcomeSelector);
    const shouldPlay = enabled && !(isClassicGame && outcome);
    usePageTransitionMediaVolume(audioRef, volume);

    useEffect(() => {
        if (isClassicGame && audioRef.current) audioRef.current.currentTime = 0;
    }, [isClassicGame]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !shouldPlay) return;

        const play = () => {
            void audio.play().catch((error: unknown) => {
                // Browsers may require a user gesture before allowing music.
                if (error instanceof DOMException && (error.name === "NotAllowedError" || error.name === "AbortError")) return;
                console.warn("Unable to play background music", error);
            });
        };
        const handleInteraction = (event: Event) => {
            if (event.isTrusted && audio.paused) play();
        };

        play();
        document.addEventListener("click", handleInteraction, true);
        document.addEventListener("keydown", handleInteraction, true);
        document.addEventListener("pointerup", handleInteraction, true);

        return () => {
            document.removeEventListener("click", handleInteraction, true);
            document.removeEventListener("keydown", handleInteraction, true);
            document.removeEventListener("pointerup", handleInteraction, true);
            audio.pause();
        };
    }, [shouldPlay]);

    return <audio ref={audioRef} src={SOUND_PATHS.Theme1} loop preload="none"/>;
};

export default BackgroundMusic;
