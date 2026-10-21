import styled, {keyframes} from "styled-components";
import {PixelCardStyled} from "styles/PixelCardStyled.ts";
import {TooltipStyled} from "components/Tooltip/styles.ts";
import {getColoredTextStrokeStyle} from "styles/TextStrokeStyle.ts";

export const HeroHealthBarStyled = styled.div`
    --health-bar-height: 20px;
    min-width: 0;

    > ${TooltipStyled} {
        display: block;
        width: 100%;
    }
`;

export const HealthContentStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
`;

export const HeartIconStyled = styled.img`
    flex-shrink: 0;
    width: var(--health-bar-height);
    height: var(--health-bar-height);
    object-fit: contain;
    image-rendering: pixelated;
`;

export const HealthLabelStyled = styled.span<{$title?: boolean; $overlay?: boolean; $outside?: boolean}>`
    flex-shrink: 0;
    white-space: nowrap;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    ${getColoredTextStrokeStyle("black", 2)};

    ${({$overlay}) => $overlay && `
        display: none;
        position: absolute;
        inset: 0;
        align-items: center;
        justify-content: center;
        z-index: 1;
        pointer-events: none;
    `}

    @media ${({theme}) => theme.media.tablet} {
        display: ${({$title, $outside, $overlay}) => $title || $outside ? "none" : $overlay ? "flex" : "inline"};
    }
`;

export const HealthTrackStyled = styled(PixelCardStyled).attrs({$size: 2, $width: 2, $color: "#9e5555"})`
    position: relative;
    flex: 1;
    min-width: 0;
    height: var(--health-bar-height);
    overflow: hidden;
    background: #261010;
`;

export const HealthFillStyled = styled.div`
    height: 100%;
    background: #c83232;
`;

export const HealingHealthFillStyled = styled(HealthFillStyled)<{$from: number; $to: number; $duration: number}>`
    width: ${({$to}) => $to}%;
    animation-name: ${({$from, $to}) => keyframes`
        from { width: ${$from}%; }
        to { width: ${$to}%; }
    `};
    animation-duration: ${({$duration}) => $duration}ms;
    animation-timing-function: ease-out;
    animation-fill-mode: both;

    @media (prefers-reduced-motion: reduce) { animation: none; }
`;
