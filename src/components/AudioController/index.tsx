import {useEffect, useLayoutEffect, type FC} from "react";
import {useAudioManager} from "hooks/useAudioManager.ts";
import {useAppSelector} from "store/hooks.ts";
import {soundSettingsSelector} from "store/features/settings/selectors.ts";
import {useLocation} from "react-router";
import BackgroundMusic from "./components/BackgroundMusic";

const AudioController: FC = () => {
    const {pathname} = useLocation();
    const audio = useAudioManager();
    const {enabled, volume} = useAppSelector(soundSettingsSelector);

    // Apply persisted settings before child components' playback effects run.
    useLayoutEffect(() => {
        audio.setVolume(volume);
        audio.setEnabled(enabled);
    }, [audio, enabled, volume]);

    useEffect(() => {
        const handleInteraction = (event: Event) => {
            if (!event.isTrusted) return;
            void audio.unlock().catch((error: unknown) => {
                console.warn("Unable to unlock audio", error);
            });
        };

        document.addEventListener("click", handleInteraction, true);
        document.addEventListener("keydown", handleInteraction, true);
        document.addEventListener("pointerup", handleInteraction, true);

        return () => {
            document.removeEventListener("click", handleInteraction, true);
            document.removeEventListener("keydown", handleInteraction, true);
            document.removeEventListener("pointerup", handleInteraction, true);
            // Keep the shared context usable across Strict Mode effect replays.
            audio.stopAll();
        };
    }, [audio]);

    return pathname === "/" ? null : <BackgroundMusic/>;
};

export default AudioController;
