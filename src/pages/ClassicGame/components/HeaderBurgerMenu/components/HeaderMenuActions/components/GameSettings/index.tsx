import {useState, type FC} from "react";
import {useTranslation} from "react-i18next";
import {useFullScreenObserver} from "hooks/useFullScreenObserver.ts";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {setMusicEnabled} from "store/features/settings";
import {musicSettingsSelector} from "store/features/settings/selectors.ts";
import {ActionButtonStyled} from "../../styles.ts";
import {getMusicLabel, getFullscreenLabel} from "./constants.ts";
import {GameSettingsStyled} from "./styles.ts";

const GameSettings: FC = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const music = useAppSelector(musicSettingsSelector);
    const isFullscreen = useFullScreenObserver();
    const [isFullscreenPending, setIsFullscreenPending] = useState(false);
    const [fullscreenError, setFullscreenError] = useState(false);

    const handleFullscreenChange = async (enabled: boolean) => {
        setIsFullscreenPending(true);
        setFullscreenError(false);
        try {
            if (enabled) {
                await document.documentElement.requestFullscreen();
            } else if (document.fullscreenElement) {
                await document.exitFullscreen();
            }
        } catch {
            setFullscreenError(true);
        } finally {
            setIsFullscreenPending(false);
        }
    };

    return (
        <GameSettingsStyled>
            <ActionButtonStyled
                value={getMusicLabel(music.enabled)}
                showBullet={false}
                aria-pressed={music.enabled}
                onClick={() => dispatch(setMusicEnabled(!music.enabled))}
            />
            <ActionButtonStyled
                value={getFullscreenLabel(isFullscreen)}
                showBullet={false}
                aria-pressed={isFullscreen}
                disabled={(!document.fullscreenEnabled && !isFullscreen) || isFullscreenPending}
                onClick={() => void handleFullscreenChange(!isFullscreen)}
            />
            {fullscreenError && <p role="alert">{t("page.settings.display.fullscreenError")}</p>}
        </GameSettingsStyled>
    );
};

export default GameSettings;
