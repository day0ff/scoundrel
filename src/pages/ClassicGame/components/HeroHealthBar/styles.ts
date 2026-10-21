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

    @media ${({theme}) => theme.media.tablet} and (orientation: landscape) {
        --health-bar-height: 36px;
        position: absolute;
        inset: 0 0 auto;
        height: min(100%, clamp(168px, 50dvh, 260px));
        width: 48px;
        min-height: 0;
        display: flex;

        > ${TooltipStyled} {
            display: flex;
            flex: 1;
            min-height: 0;
        }
    }
`;

export const HealthContentStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;

    @media ${({theme}) => theme.media.tablet} and (orientation: landscape) {
        flex-direction: column;
        gap: 4px;
        flex: 1;
        min-height: 0;
    }
`;

export const HeartIconStyled = styled.img`
    flex-shrink: 0;
    width: var(--health-bar-height);
    height: var(--health-bar-height);
    object-fit: contain;
    image-rendering: pixelated;

    @media ${({theme}) => theme.media.tablet} and (orientation: landscape) {
        width: 36px;
        height: 36px;
    }
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

    @media ${({theme}) => theme.media.tablet} and (orientation: landscape) {
        ${({$overlay}) => $overlay && `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2px;
            font-size: 18px;
            line-height: 1;
            color: #fff;
            z-index: 2;
            > [data-single-digit="true"]::before {
                content: "0";
            }
        `}
    }
`;

export const HealthTrackStyled = styled(PixelCardStyled).attrs({$size: 2, $width: 2, $color: "#9e5555"})`
    position: relative;
    flex: 1;
    min-width: 0;
    height: var(--health-bar-height);
    overflow: hidden;
    background: #261010;

    @media ${({theme}) => theme.media.tablet} and (orientation: landscape) {
        flex: 1;
        width: var(--health-bar-height);
        height: auto;
        min-height: 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
`;

export const HealthFillStyled = styled.div<{$fill?: number}>`
    width: ${({$fill}) => $fill ?? 100}%;
    height: 100%;
    background: #c83232;

    @media ${({theme}) => theme.media.tablet} and (orientation: landscape) {
        width: 100%;
        height: ${({$fill}) => $fill ?? 100}%;
        flex-shrink: 0;
    }
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

    @media ${({theme}) => theme.media.tablet} and (orientation: landscape) {
        width: 100%;
        height: ${({$to}) => $to}%;
        animation-name: ${({$from, $to}) => keyframes`
            from { height: ${$from}%; }
            to { height: ${$to}%; }
        `};
    }

    @media (prefers-reduced-motion: reduce) { animation: none; }
`;
