import styled, {css, keyframes} from "styled-components";
import {PixelCardStyled} from "styles/PixelCardStyled.ts";
import {OldScreenStyle} from "styles/OldScreenStyle.ts";
import {REVEAL_DELAY_MS, REVEAL_DURATION_MS, TOAST_FADE_DURATION_MS, TOAST_FADE_IN_DURATION_MS} from "./constants.ts";

const erase = keyframes`
    from { opacity: 1; clip-path: inset(0); }
    to { opacity: 0; clip-path: inset(0 0 100% 0); }
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

export const RevealCoverStyled = styled.div<{$visible: boolean}>`
    position: absolute;
    inset: 0;
    ${({$visible}) => $visible && css`
        animation: ${erase} ${REVEAL_DURATION_MS}ms ease-in-out ${REVEAL_DELAY_MS}ms both;
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
