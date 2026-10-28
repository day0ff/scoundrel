import styled from "styled-components";
import {PackBoxDraggableDeckStyled} from "componentsShared/Packs/components/PackBox/styles.ts";

export const TabsStyled = styled.div<{$fullSize: boolean}>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: ${({$fullSize}) => $fullSize ? "48px" : "16px"};
    padding: 16px;
    max-width: 100%;
    box-sizing: border-box;

    @media ${({theme}) => theme.media.tablet} {
        gap: ${({$fullSize}) => $fullSize ? "32px" : "16px"};
    }
`;

export const TabStyled = styled.button`
    position: relative;
    width: fit-content;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
    filter: brightness(0.7);
    &[aria-selected="true"], &[aria-pressed="true"] { filter: drop-shadow(0 0 6px #d2a052); }
    &:focus-visible { outline: 2px solid gold; outline-offset: 4px; }
    &:disabled { opacity: 1; filter: none; cursor: default; }
`;

export const TabPackBoxStyled = styled(PackBoxDraggableDeckStyled).attrs({
    size: 2, wobbleIntensity: 0, wobbleSpeed: 0,
})<{$fullSize: boolean}>`
    width: ${({$fullSize}) => $fullSize ? "200px" : "80px"};
    @media ${({theme}) => theme.media.laptop} {
        width: ${({$fullSize}) => $fullSize ? "160px" : "80px"};
    }
    @media ${({theme}) => theme.media.tablet} {
        width: ${({$fullSize}) => $fullSize ? "140px" : "60px"};
    }
`;
