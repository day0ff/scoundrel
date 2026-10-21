import {CollectionsTitleStyled} from "componentsShared/Collections/styles.ts";
import {useId, useState, type FC} from "react";
import {useFullScreenObserver} from "hooks/useFullScreenObserver.ts";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {setSoundEnabled, setSoundVolume, setMusicEnabled, setMusicVolume} from "store/features/settings";
import {soundSettingsSelector, musicSettingsSelector} from "store/features/settings/selectors.ts";
import {SettingsStyled, ControlsStyled, ToggleStyled, VolumeStyled} from "./styles.ts";

import SettingsInput from "./components/SettingsInput";
import LanguageSelect from "./components/LanguageSelect";

const Settings: FC = () => {
    const {t} = useTranslation();
    const volumeId = useId();
    const musicVolumeId = useId();
    const dispatch = useAppDispatch();
    const {enabled, volume} = useAppSelector(soundSettingsSelector);
    const percentage = Math.round(volume * 100);
    const music = useAppSelector(musicSettingsSelector);
    const musicPercentage = Math.round(music.volume * 100);
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
        <SettingsStyled>
            <CollectionsTitleStyled>{t("page.settings.title")}</CollectionsTitleStyled>
            <ControlsStyled>
                <legend>{t("page.settings.language.title")}</legend>
                <LanguageSelect/>
            </ControlsStyled>
            <ControlsStyled>
                <legend>{t("page.settings.display.title")}</legend>
                <ToggleStyled>
                    <SettingsInput
                        type="checkbox"
                        checked={isFullscreen}
                        disabled={!document.fullscreenEnabled || isFullscreenPending}
                        onChange={(event) => void handleFullscreenChange(event.target.checked)}
                    />
                    {t("page.settings.display.fullscreen")}
                </ToggleStyled>
                {fullscreenError && <p role="alert">{t("page.settings.display.fullscreenError")}</p>}
            </ControlsStyled>
            <ControlsStyled>
                <legend>{t("page.settings.sound.title")}</legend>
                <ToggleStyled>
                    <SettingsInput
                        type="checkbox"
                        checked={enabled}
                        onChange={(event) => dispatch(setSoundEnabled(event.target.checked))}
                    />
                    {t("page.settings.sound.enabled")}
                </ToggleStyled>
                <VolumeStyled>
                    <label htmlFor={volumeId}>{t("page.settings.sound.volume")}</label>
                    <output htmlFor={volumeId}>{percentage}%</output>
                    <SettingsInput
                        id={volumeId}
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={percentage}
                        aria-valuetext={`${percentage}%`}
                        onChange={(event) => dispatch(setSoundVolume(Number(event.target.value) / 100))}
                    />
                </VolumeStyled>
            </ControlsStyled>
            <ControlsStyled>
                <legend>{t("page.settings.music.title")}</legend>
                <ToggleStyled>
                    <SettingsInput
                        type="checkbox"
                        checked={music.enabled}
                        onChange={(event) => dispatch(setMusicEnabled(event.target.checked))}
                    />
                    {t("page.settings.music.enabled")}
                </ToggleStyled>
                <VolumeStyled>
                    <label htmlFor={musicVolumeId}>{t("page.settings.music.volume")}</label>
                    <output htmlFor={musicVolumeId}>{musicPercentage}%</output>
                    <SettingsInput
                        id={musicVolumeId}
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={musicPercentage}
                        aria-valuetext={`${musicPercentage}%`}
                        onChange={(event) => dispatch(setMusicVolume(Number(event.target.value) / 100))}
                    />
                </VolumeStyled>
            </ControlsStyled>
        </SettingsStyled>
    );
};

export default Settings;
