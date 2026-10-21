import styled from "styled-components";
import {bounce, fadeIn} from "../styles.ts";

export const WaveStyled = styled.span`
    position: relative;
    display: inline-block;
    white-space: pre;
`;

export const WaveShadow = styled.span`
    position: absolute;
    inset: 0;
    color: transparent;
    text-shadow: -1px -1px 0 #00000099, -1px 1px 0 #00000099, 0 2px 1px #00000099, 0 4px 1px darkgray;
    pointer-events: none;
`;

export const WaveShadowCharStyled = styled.span<{$delay: number; $speed: number;}>`
    display: inline-block;
    opacity: 0;
    background-clip: text;
    animation: ${fadeIn} 0s forwards;
    animation-delay: ${({$delay}) => `${$delay}s`};
`;

export const WaveCharStyled = styled.span<{$delay: number; $speed: number;}>`
    display: inline-block;
    opacity: 0;
    background-clip: text;
    animation: ${fadeIn} ${({$speed}) => $speed}s forwards, ${bounce} 10s ease-in-out infinite;
    animation-delay: ${({$delay}) => `${$delay}s`};
`;
