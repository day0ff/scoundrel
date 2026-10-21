import styled from "styled-components";
import {bounce} from "../styles.ts";

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

export const WaveCharStyled = styled.span<{$delay: number;}>`
    display: inline-block;
    background-clip: text;
    animation: ${bounce} 10s ease-in-out infinite;
    animation-delay: ${({$delay}) => `${$delay}s`};
`;
