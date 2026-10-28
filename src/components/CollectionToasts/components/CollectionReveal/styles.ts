import styled, {css, keyframes} from "styled-components";
import {PixelCardStyled} from "styles/PixelCardStyled.ts";
import {OldScreenStyle} from "styles/OldScreenStyle.ts";
import {REVEAL_DELAY_MS, REVEAL_DURATION_MS, TOAST_FADE_DURATION_MS, TOAST_FADE_IN_DURATION_MS} from "./constants.ts";

const splitCover = keyframes`
    0% {
        opacity: 1;
        transform: translateX(0) rotate(0deg);
    }
    15% {
        opacity: 1;
        transform: translateX(calc(var(--split-direction) * 3px)) rotate(calc(var(--split-direction) * 2deg));
    }
    65% { opacity: 1; }
    100% {
        opacity: 0;
        transform: translateX(calc(var(--split-direction) * 90%)) rotate(calc(var(--split-direction) * 10deg));
    }
`;

export const CollectionRevealStyled = styled(PixelCardStyled)<{$closing: boolean; $visible: boolean}>`
    position: relative;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto;
    justify-items: center;
    row-gap: 10px;
    padding: 24px;
    background: #19151f;
    box-shadow: 0 8px 24px #0009;
    cursor: pointer;

    &:focus-visible { outline: 2px solid #e7bd76; outline-offset: -8px; }
    opacity: ${({$visible, $closing}) => $visible && !$closing ? 1 : 0};
    pointer-events: ${({$visible, $closing}) => $visible && !$closing ? "auto" : "none"};
    transition: opacity ${({$closing}) => $closing ? TOAST_FADE_DURATION_MS : TOAST_FADE_IN_DURATION_MS}ms ease-in-out;

    @media (prefers-reduced-motion: reduce) { transition: none; }
`;

export const RevealScreenStyled = styled.div`
    position: absolute;
    inset: 0;
    pointer-events: none;
    ${OldScreenStyle};

    @media (prefers-reduced-motion: reduce) {
        &::after { animation: none; }
    }
`;

export const RevealCardStyled = styled.div`
    position: relative;
    grid-column: 1;
    grid-row: 2;
    width: 112px;
    height: 168px;
    isolation: isolate;

    @media ${({theme}) => theme.media.mobile} {
        width: 88px;
        height: 132px;
    }
`;

export const RevealCoverStyled = styled.div<{$visible: boolean; $side: "left" | "right"}>`
    position: absolute;
    inset: 0;
    --split-direction: ${({$side}) => $side === "left" ? -1 : 1};
    transform-origin: ${({$side}) => $side} center;
    clip-path: ${({$side}) => $side === "left"
        ? "polygon(0 0, 50% 0, 46% 18%, 55% 33%, 45% 50%, 54% 68%, 47% 83%, 50% 100%, 0 100%)"
        : "polygon(50% 0, 100% 0, 100% 100%, 50% 100%, 47% 83%, 54% 68%, 45% 50%, 55% 33%, 46% 18%)"};
    ${({$visible}) => $visible && css`
        animation: ${splitCover} ${REVEAL_DURATION_MS}ms ease-in-out ${REVEAL_DELAY_MS}ms both;
    `}
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
        display: none;
    }
`;

export const RevealContentStyled = styled.div`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
`;

export const RevealTitleStyled = styled.p`
    grid-column: 1;
    grid-row: 1;
    margin: 0;
    color: #e7bd76;
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
`;
