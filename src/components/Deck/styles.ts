import styled from "styled-components";
import {getColoredTextStrokeStyle} from "styles/TextStrokeStyle.ts";

export const DeckCountStyled = styled.span`
    position: absolute;
    inset: auto 0 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    color: #f1edda;
    text-align: center;
    font-variant-numeric: tabular-nums;
    ${getColoredTextStrokeStyle("black", 2)};
`;

export const DeckStyled = styled.div`
    display: grid;
    justify-items: center;
    &[role="button"] { cursor: pointer; }
`;

export const DeckStackStyled = styled.div`
    position: relative;
    width: clamp(80px, 12vw, 150px);
    aspect-ratio: 2 / 3;
    pointer-events: none;
`;

export const DeckImageStyled = styled.img<{$empty: boolean}>`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
    filter: ${({$empty}) => $empty ? "sepia(1)" : "none"};
`;

export const DeckLayerStyled = styled.div`
    position: absolute;
    inset: 0;
`;

export const DeckOverlayStyled = styled.div<{$color: string}>`
    position: absolute;
    inset: 0;
    background-color: ${({$color}) => $color};
    opacity: 0.4;
    mask-size: contain;
    mask-position: center;
    mask-repeat: no-repeat;
    pointer-events: none;
    filter: brightness(0.5);
`;
