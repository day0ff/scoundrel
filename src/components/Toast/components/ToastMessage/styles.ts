import styled, {css, keyframes} from "styled-components";
import {PixelCardStyled} from "styles/PixelCardStyled.ts";
import {TOAST_DISPLAY_DURATION_MS, TOAST_FADE_DURATION_MS} from "./constants.ts";

export const toastFadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;
const fadeOut = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
`;
const dismiss = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
`;

export const ToastMessageStyled = styled(PixelCardStyled)<{$closing: boolean}>`
    position: relative;
    box-sizing: border-box;
    padding: 24px;
    background: #17251f;
    color: #f1edda;
    line-height: 1.5;
    overflow-wrap: anywhere;
    pointer-events: auto;
    ${({$closing}) => $closing ? css`
        animation: ${dismiss} ${TOAST_FADE_DURATION_MS}ms linear forwards;
    ` : css`
        animation: ${toastFadeIn} ${TOAST_FADE_DURATION_MS}ms linear forwards,
            ${fadeOut} ${TOAST_FADE_DURATION_MS}ms linear ${TOAST_DISPLAY_DURATION_MS}ms forwards;
    `}

    &:hover, &:focus-within {
        animation-play-state: ${({$closing}) => $closing ? "running" : "running, paused"};
    }
    &:focus-visible { background: #304734; }

    @media (prefers-reduced-motion: reduce) {
        animation-duration: 1ms;
    }
`;

export const ToastMessageContentStyled = styled.div`
    max-height: max(1lh, calc(100dvh - 96px));
    overflow: auto;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    overscroll-behavior: contain;
`;
