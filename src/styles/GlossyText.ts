import styled, { keyframes } from "styled-components";

const shine = keyframes`
  0% { background-position: 100% 0; }
  20% { background-position: -80% 0; } 
  100% { background-position: -100% 0; }
`;

export const GlossyText = styled.span<{$color?: string}>`
    display: inline-block;
    color: transparent;
    background: ${({$color}) => $color ?? 'white'} linear-gradient(
            60deg,
            rgba(255, 255, 255, 0) 30%,
            rgba(255, 255, 255, 0.9) 50%,
            rgba(255, 255, 255, 0) 70%
    );
    background-size: 200% 200%;
    background-clip: text;
    animation: ${shine} 8s linear infinite;
`;