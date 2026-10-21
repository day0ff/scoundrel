import styled, {keyframes} from "styled-components";
import {bounce} from "../styles.ts";

const shine = keyframes`
    0% {
        background-position-x: 150%;
    }
    20% {
        background-position-x: -100%;
    }
    100% {
        background-position-x: -100%;
    }
`;

export const ScoreWrapperStyled = styled.span`
    position: relative;
    pointer-events: auto;
    display: inline-block;
    white-space: pre;
`;

export const ScoreShadowStyled = styled.span`
    position: absolute;
    inset: 0;
    pointer-events: none;
`;

export const ScoreShadowCharStyled = styled.span<{ $isPower: boolean;}>`
    display: inline-block;
    color: transparent;
    letter-spacing: -2px;
    vertical-align: ${({$isPower}) => $isPower ? 'top' : 'bottom'};
    text-shadow: -1px -1px 0 black, -1px 1px 0 black, 0 2px 1px black;
`;

export const ScoreCharStyled = styled.span<{ $isPower: boolean; $color?: string; $shine?: string; }>`
    display: inline-block;
    color: transparent;
    letter-spacing: -2px;
    vertical-align: ${({$isPower}) => $isPower ? 'top' : 'bottom'};
    background: ${({$color}) => $color} linear-gradient(
            75deg,
            ${({$shine}) => `
                rgb(from ${$shine} r g b / 0) 25%,
                rgb(from ${$shine} r g b / 0.95) 50%,
                rgb(from ${$shine} r g b / 0) 75%
            `}
    ) no-repeat;
    background-position-x: 150%;
    background-size: 200% 200%;
    background-clip: text;
    filter: drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black);
    animation: ${bounce} 10s ease-in-out infinite, ${shine} 5s ease-in-out infinite;
    animation-delay: var(--delay, 0ms);
`;
