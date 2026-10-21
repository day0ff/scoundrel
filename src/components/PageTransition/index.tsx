import {useCallback, useEffect, useLayoutEffect, useRef, useState, type AnimationEvent, type FC, type TransitionEvent} from "react";
import {createPortal} from "react-dom";
import {useTranslation} from "react-i18next";
import Card from "components/Card";
import PasteboardCardMark from "components/PasteboardCard/components/PasteboardCardMark";
import {useAudioManager} from "hooks/useAudioManager.ts";
import {SOUND_PATHS} from "assets/sounds";
import type {SoundPlaybackType} from "utils/AudioManager/types.ts";

import {
    CARD_BACK_HOLD_DURATION_MS, CARD_EXIT_DURATION_MS, CARD_REVEAL_DURATION_MS,
    CURTAIN_CORNERS, CURTAIN_DURATION_MS, TRANSITION_CARDS,
} from "./constants.ts";
import {preloadCardImages} from "./helpers.ts";
import {CardRevealStyled, CardStageStyled, CurtainsStyled, CurtainStyled, PageTransitionStyled} from "./styles.ts";
import type {PageTransitionPhaseType, PageTransitionPropsType} from "./types.ts";

const PageTransition: FC<PageTransitionPropsType> = ({active, onClosing, onCovered, onOpening, onOpened}) => {
    const {t} = useTranslation();
    const audio = useAudioManager();
    const [phase, setPhase] = useState<PageTransitionPhaseType>("idle");
    const [card, setCard] = useState<typeof TRANSITION_CARDS[number] | null>(null);
    const [cardReady, setCardReady] = useState(false);
    const [cardRevealed, setCardRevealed] = useState(false);
    const phaseRef = useRef<PageTransitionPhaseType>("idle");
    const callbacksRef = useRef({onClosing, onCovered, onOpening, onOpened});
    const notifiedRef = useRef(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const visible = phase !== "idle";

    useLayoutEffect(() => {
        callbacksRef.current = {onClosing, onCovered, onOpening, onOpened};
    }, [onClosing, onCovered, onOpening, onOpened]);

    useLayoutEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog || !visible) return;

        const bringToFront = () => {
            if (dialog.open) dialog.close();
            dialog.showModal();
        };
        bringToFront();

        // Destination pages can open their own modal while the curtains are closed.
        const observer = new MutationObserver((mutations) => {
            if (mutations.some(({target}) => target instanceof HTMLDialogElement
                && target !== dialog && target.open)) bringToFront();
        });
        observer.observe(document.body, {subtree: true, attributes: true, attributeFilter: ["open"]});
        document.addEventListener("fullscreenchange", bringToFront);

        const blockInteraction = (event: Event) => {
            if (event instanceof KeyboardEvent && (event.ctrlKey || event.metaKey || event.altKey)) return;
            event.preventDefault();
            event.stopImmediatePropagation();
        };
        const events = ["keydown", "keyup", "click", "pointerdown", "pointerup", "wheel", "touchmove"];
        for (const name of events) window.addEventListener(name, blockInteraction, {capture: true, passive: false});

        return () => {
            observer.disconnect();
            document.removeEventListener("fullscreenchange", bringToFront);
            for (const name of events) window.removeEventListener(name, blockInteraction, true);
            dialog.close();
        };
    }, [visible]);

    useEffect(() => {
        void audio.preload([SOUND_PATHS.Transition]).catch((error: unknown) => {
            console.warn("Unable to preload transition sound", error);
        });
    }, [audio]);

    const finishCurtains = useCallback(() => {
        if (phaseRef.current === "closing") {
            phaseRef.current = "covered";
            setPhase("covered");
        } else if (phaseRef.current === "opening") {
            phaseRef.current = "idle";
            setPhase("idle");
            callbacksRef.current.onOpened?.();
        }
    }, []);

    const handleCurtainEnd = (event: TransitionEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget && event.propertyName === "transform") finishCurtains();
    };

    const handleCardEnd = (event: AnimationEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget
            && (phaseRef.current === "closing" || phaseRef.current === "covered")) setCardRevealed(true);
    };

    useLayoutEffect(() => {
        if (!active && phaseRef.current === "idle") return;

        const controller = new AbortController();
        let playback: SoundPlaybackType | null = null;
        let timer: ReturnType<typeof setTimeout> | undefined;
        let cardTimer: ReturnType<typeof setTimeout> | undefined;
        let openingTimer: ReturnType<typeof setTimeout> | undefined;
        let frame = 0;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const duration = reducedMotion ? 1 : CURTAIN_DURATION_MS + (active ? 0 : CARD_EXIT_DURATION_MS);

        if (active) {
            phaseRef.current = "preparing";
            setPhase("preparing");
            notifiedRef.current = false;
            setCardReady(false);
            setCardRevealed(false);
            const selectedCard = TRANSITION_CARDS[Math.floor(Math.random() * TRANSITION_CARDS.length)];
            setCard(selectedCard);
            void preloadCardImages([selectedCard.face, selectedCard.back], controller.signal).then(() => {
                if (controller.signal.aborted) return;
                // Start both animations together after the card artwork is ready.
                frame = requestAnimationFrame(() => {
                    phaseRef.current = "closing";
                    setCardReady(true);
                    setPhase("closing");
                    callbacksRef.current.onClosing?.(reducedMotion ? 1 : CURTAIN_DURATION_MS);
                    timer = setTimeout(finishCurtains, duration + 100);
                    if (reducedMotion) setCardRevealed(true);
                    else cardTimer = setTimeout(() => setCardRevealed(true),
                        CARD_BACK_HOLD_DURATION_MS + CARD_REVEAL_DURATION_MS + 100);
                    void audio.playSound({url: SOUND_PATHS.Transition}).then((sound) => {
                        if (controller.signal.aborted) sound?.stop();
                        else playback = sound;
                    }).catch((error: unknown) => {
                        console.warn("Unable to play transition sound", error);
                    });
                });
            });
        } else {
            phaseRef.current = "opening";
            setPhase("opening");
            openingTimer = setTimeout(() => {
                callbacksRef.current.onOpening?.(reducedMotion ? 1 : CURTAIN_DURATION_MS);
            }, reducedMotion ? 0 : CARD_EXIT_DURATION_MS);
            // Fallback for interrupted transitions or browsers that omit transitionend.
            timer = setTimeout(finishCurtains, duration + 100);
        }

        return () => {
            clearTimeout(timer);
            clearTimeout(cardTimer);
            clearTimeout(openingTimer);
            cancelAnimationFrame(frame);
            controller.abort();
            playback?.stop();
        };
    }, [active, audio, finishCurtains]);

    useEffect(() => {
        if (phase !== "covered" || !cardReady || !cardRevealed || notifiedRef.current) return;
        notifiedRef.current = true;
        callbacksRef.current.onCovered?.();
    }, [phase, cardReady, cardRevealed]);

    const closed = phase === "closing" || phase === "covered";

    return createPortal(
        <PageTransitionStyled
            ref={dialogRef}
            $visible={visible}
            data-page-transition
            aria-label={t("ui.pageTransition.loading")}
            tabIndex={-1}
            onCancel={event => event.preventDefault()}
        >
            <CurtainsStyled>
                {CURTAIN_CORNERS.map((corner) => (
                    <CurtainStyled
                        key={corner}
                        $corner={corner}
                        $closed={closed}
                        $opening={phase === "opening"}
                        onTransitionEnd={corner === "bottom-right" ? handleCurtainEnd : undefined}
                    />
                ))}
            </CurtainsStyled>
            {(closed || phase === "opening") && cardReady && card && (
                <CardStageStyled $visible={closed} aria-hidden="true">
                    <CardRevealStyled $opening={phase === "opening"} onAnimationEnd={handleCardEnd}>
                        <Card
                            {...card}
                            mark={<PasteboardCardMark suit={card.suit} rank={card.rank} color={card.color}/>}
                        />
                    </CardRevealStyled>
                </CardStageStyled>
            )}
        </PageTransitionStyled>,
        document.body,
    );
};

export default PageTransition;
