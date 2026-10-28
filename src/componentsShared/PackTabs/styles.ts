import styled, {css} from "styled-components";
import {PackBoxDraggableDeckStyled} from "componentsShared/Packs/components/PackBox/styles.ts";
import Tooltip from "components/Tooltip";

export const TabsStyled = styled.div<{$fullSize: boolean}>`
    display: flex;
    flex-wrap: ${({$fullSize}) => $fullSize ? "nowrap" : "wrap"};
    justify-content: center;
    gap: ${({$fullSize}) => $fullSize ? "48px" : "16px"};
    padding: 16px;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;

    ${({$fullSize}) => $fullSize && css`
        align-self: center;
        flex-shrink: 1;

        & > span + span {
            margin-inline-start: calc(-1 * var(--pack-overlap, 0px));
        }
    `}

    @media ${({theme}) => theme.media.tablet} {
        gap: ${({$fullSize}) => $fullSize ? "32px" : "16px"};
    }
`;

export const TabTooltipStyled = styled(Tooltip)<{$selected: boolean}>`
    position: relative;
    flex-shrink: 0;
    z-index: ${({$selected}) => $selected ? 1 : 0};

    &:focus-within { z-index: 2; }
`;

export const TabTooltipReferenceStyled = styled.span`
    display: inline-flex;
`;

export const TabStyled = styled.button<{$color: string}>`
    position: relative;
    width: fit-content;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
    filter: brightness(0.7);
    transition: transform 200ms ease, filter 200ms ease;
    &[aria-selected="true"], &[aria-pressed="true"] { filter: drop-shadow(0 0 6px ${({$color}) => $color}); }
    &:disabled, &[aria-disabled="true"] { opacity: 1; filter: none; cursor: default; }
    &:hover:not(:disabled), &:focus {
        outline: none;
        transform: translateY(-8px);
        filter: brightness(1) drop-shadow(0 0 8px ${({$color}) => $color}) drop-shadow(8px 12px 0 #00000099);
    }

    @media (prefers-reduced-motion: reduce) { transition: none; }
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
