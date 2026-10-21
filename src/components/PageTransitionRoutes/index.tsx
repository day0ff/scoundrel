import {useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState, type FC} from "react";
import {Route, Routes, useLocation} from "react-router";
import {PageTransitionContext} from "context/PageTransition/context.ts";
import PageTransition from "components/PageTransition";
import {PageTransitionAudioContext} from "context/PageTransitionAudio/context.ts";
import type {PageTransitionAudioType} from "context/PageTransitionAudio/types.ts";

import PageLayout from "./components/PageLayout";
import {CARD_HOLD_DURATION_MS} from "./constants.ts";
import {createRouteTransitionState, routeTransitionReducer} from "./helpers.ts";
import {RouteContentStyled} from "./styles.ts";
import type {PageTransitionRoutesPropsType} from "./types.ts";

const PageTransitionRoutes: FC<PageTransitionRoutesPropsType> = ({children}) => {
    const location = useLocation();
    const [state, dispatch] = useReducer(routeTransitionReducer, location, createRouteTransitionState);
    const contentRef = useRef<HTMLDivElement>(null);
    const previousPhaseRef = useRef(state.phase);
    const busy = state.phase !== "idle";
    const [transitionAudio, setTransitionAudio] = useState<PageTransitionAudioType>({gain: 1, durationMs: 0});

    useLayoutEffect(() => {
        dispatch({type: "navigate", location});
    }, [location]);

    const handleClosing = useCallback((durationMs: number) => {
        setTransitionAudio({gain: 0, durationMs});
    }, []);

    const handleCovered = useCallback(() => {
        setTransitionAudio({gain: 0, durationMs: 0});
        dispatch({type: "covered", time: performance.now()});
    }, []);

    const handleOpening = useCallback((durationMs: number) => {
        setTransitionAudio({gain: 1, durationMs});
    }, []);

    const handleOpened = useCallback(() => {
        setTransitionAudio({gain: 1, durationMs: 0});
        dispatch({type: "opened"});
    }, []);

    useEffect(() => {
        if (state.phase !== "covered") return;
        const hold = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? 0 : CARD_HOLD_DURATION_MS;
        let nextFrame = 0;
        let timer: ReturnType<typeof setTimeout> | undefined;
        // Allow the committed destination to paint behind the curtains first.
        const frame = requestAnimationFrame(() => {
            nextFrame = requestAnimationFrame(() => {
                timer = setTimeout(() => {
                    dispatch({type: "open", locationKey: state.location.key});
                }, Math.max(0, hold - (performance.now() - state.coveredAt)));
            });
        });

        return () => {
            cancelAnimationFrame(frame);
            cancelAnimationFrame(nextFrame);
            clearTimeout(timer);
        };
    }, [state.phase, state.location, state.coveredAt]);

    useLayoutEffect(() => {
        if (state.phase === "idle" && previousPhaseRef.current === "opening") {
            const dialog = document.querySelector<HTMLDialogElement>("dialog[open]:not([data-page-transition])");
            const container = dialog ?? contentRef.current;
            const target = container?.querySelector<HTMLElement>('[data-page-autofocus]:not([disabled]), [autofocus]:not([disabled])')
                ?? container?.querySelector<HTMLElement>(
                    'button:not([disabled]), input[type="button"]:not([disabled]), a[href], [tabindex="0"]',
                );
            target?.focus({preventScroll: true});
        }
        previousPhaseRef.current = state.phase;
    }, [state.phase]);

    return (
        <PageTransitionContext.Provider value={busy}>
            <PageTransitionAudioContext.Provider value={transitionAudio}>
                <RouteContentStyled ref={contentRef} inert={busy} aria-hidden={busy ? true : undefined}>
                    <Routes location={state.location}>
                        <Route element={<PageLayout/>}>{children}</Route>
                    </Routes>
                </RouteContentStyled>
                <PageTransition
                    active={state.phase === "closing" || state.phase === "covered"}
                    onClosing={handleClosing}
                    onCovered={handleCovered}
                    onOpening={handleOpening}
                    onOpened={handleOpened}
                />
            </PageTransitionAudioContext.Provider>
        </PageTransitionContext.Provider>
    );
};

export default PageTransitionRoutes;
