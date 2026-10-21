import {css, keyframes} from "styled-components";

const shake = keyframes`
    0% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(-0.5px);
    }
    50% {
        transform: translateY(0);
    }
    75% {
        transform: translateY(0.5px);
    }
    100% {
        transform: translateY(0);
    }
`;

export const OldScreenBackgroundStyle = css`
    background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 2px, transparent 2px, transparent 4px);
`;

export const OldScreenStyle = css`
    &::after {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 110;
        pointer-events: none;
        
        ${OldScreenBackgroundStyle};

        animation: ${shake} 0.2s infinite;
    }
`;

