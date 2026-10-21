import styled from "styled-components";
import {fadeIn} from "../styles.ts";

export const TypewriterStyled = styled.span`
    position: relative;
    display: inline-block;
    white-space: pre;
`;

export const TypewriterLetterStyled = styled.span<{ $delay: number; $speed: number; }>`
    display: inline-block;
    opacity: 0;
    animation: ${fadeIn} ${({$speed}) => $speed}s forwards;
    animation-delay: ${({$delay}) => $delay}s;
`;

