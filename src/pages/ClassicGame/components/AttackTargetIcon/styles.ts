import styled from "styled-components";

export const TargetIconStyled = styled.img<{$visible: boolean; $hoverable: boolean}>`
    position: absolute;
    top: 8px;
    right: 8px;
    width: 48%;
    aspect-ratio: 1;
    object-fit: contain;
    z-index: 2;
    pointer-events: ${({$visible, $hoverable}) => $visible && $hoverable ? "auto" : "none"};
    cursor: help;
    opacity: ${({$visible}) => $visible ? 1 : 0};
    transition: opacity 200ms ease;
    filter: drop-shadow(0 2px 4px #000000cc);

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;
