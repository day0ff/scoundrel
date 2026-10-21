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
    display: inline-block;
    vertical-align: bottom;
    white-space: pre;
`;

export const ScoreShadowStyled = styled.span`
    position: absolute;
    inset: 0;
    pointer-events: none;
`;

export const ScoreShadowCharStyled = styled.span`
    display: inline-block;
    color: transparent;
    letter-spacing: -2px;
    vertical-align: bottom;
    text-shadow: -1px -1px 0 black, -1px 1px 0 black, 0 2px 1px black;
`;

export const ScoreCharStyled = styled.span<{ $color?: string; }>`
    display: inline-block;
    color: transparent;
    letter-spacing: -2px;
    vertical-align: bottom;
    background: ${({$color}) => $color ?? 'white'} linear-gradient(
            75deg,
            rgba(255, 255, 255, 0) 25%,
            rgba(255, 255, 255, 0.95) 50%,
            rgba(255, 255, 255, 0) 75%
    ) no-repeat;
    background-position-x: 150%;
    background-size: 200% 200%;
    background-clip: text;
    filter: drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black);
    animation: ${bounce} 10s ease-in-out infinite, ${shine} 5s ease-in-out infinite;
    animation-delay: var(--delay, 0ms);
`;
