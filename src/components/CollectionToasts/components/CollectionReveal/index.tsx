import {useEffect, useRef, useState, type FC} from "react";
import {useTranslation} from "react-i18next";
import Card from "components/Card";
import {SOUND_PATHS} from "assets/sounds";
import {useAudioManager} from "hooks/useAudioManager.ts";
import type {SoundPlaybackType} from "utils/AudioManager/types.ts";
import {COLLECTION_TOAST_TITLES, REVEAL_DELAY_MS, TOAST_DURATION_MS} from "./constants.ts";
import {getRevealCard} from "./helpers.ts";
import type {CollectionRevealPropsType} from "./types.ts";
import {CollectionRevealStyled, RevealCardStyled, RevealCoverStyled, RevealContentStyled, RevealTitleStyled, RevealScreenStyled} from "./styles.ts";

const CollectionReveal: FC<CollectionRevealPropsType> = ({toast, isVisible, onClose}) => {
    const {t} = useTranslation();
    const audio = useAudioManager();
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [closing, setClosing] = useState(false);
    const remainingTime = useRef(TOAST_DURATION_MS);
    const paused = hovered || focused;
    const title = t(COLLECTION_TOAST_TITLES[toast.kind]);

    useEffect(() => {
        if (!isVisible) return;
        let cancelled = false;
        let playback: SoundPlaybackType | null = null;
        void audio.preloadSound(SOUND_PATHS.Unlock).catch(() => {});
        const timer = window.setTimeout(() => {
            void audio.playSound({url: SOUND_PATHS.Unlock}).then(result => {
                if (cancelled) result?.stop();
                else playback = result;
            }).catch((error: unknown) => console.warn("Unable to play unlock sound", error));
        }, REVEAL_DELAY_MS);
        return () => {
            cancelled = true;
            window.clearTimeout(timer);
            playback?.stop();
        };
    }, [audio, isVisible]);

    useEffect(() => {
        if (!isVisible || paused || closing) return;
        const startedAt = performance.now();
        const timer = window.setTimeout(() => setClosing(true), remainingTime.current);
        return () => {
            window.clearTimeout(timer);
            remainingTime.current = Math.max(0, remainingTime.current - (performance.now() - startedAt));
        };
    }, [isVisible, paused, closing]);

    useEffect(() => {
        if (!closing) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) onClose();
    }, [closing, onClose]);

    return (
        <CollectionRevealStyled $size={4} $width={4} $closing={closing} $visible={isVisible}
            role="button" tabIndex={closing || !isVisible ? -1 : 0} aria-disabled={closing}
            aria-label={`${title}: ${t(toast.name)}. ${t("toast.collection.dismiss")}`}
            onClick={() => setClosing(true)}
            onKeyDown={event => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                if (!event.repeat) setClosing(true);
            }}
            onTransitionEnd={event => {
                if (closing && event.target === event.currentTarget && event.propertyName === "opacity") onClose();
            }}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)} onBlur={event => {
                if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
            }}>
            <RevealTitleStyled aria-hidden="true">{title}</RevealTitleStyled>
            <RevealCardStyled aria-hidden="true">
                <Card {...getRevealCard(toast.card, toast.after)} $size={6} mark={<span/>}/>
                <RevealCoverStyled $visible={isVisible} $side="left">
                    <Card {...getRevealCard(toast.card, toast.before)} $size={6} mark={<span/>}/>
                </RevealCoverStyled>
                <RevealCoverStyled $visible={isVisible} $side="right">
                    <Card {...getRevealCard(toast.card, toast.before)} $size={6} mark={<span/>}/>
                </RevealCoverStyled>
            </RevealCardStyled>
            <RevealContentStyled role="status" aria-live="polite" aria-atomic="true">
                {title}: {t(toast.name)}
                {toast.after.isLocked && <p>{t("tag.collection.locked.name")}</p>}
            </RevealContentStyled>
            <RevealScreenStyled aria-hidden="true"/>
        </CollectionRevealStyled>
    );
};

export default CollectionReveal;
