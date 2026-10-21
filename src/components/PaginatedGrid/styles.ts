import styled, {css, keyframes} from "styled-components";
import {GRID_RESIZE_DURATION_MS, ITEM_ANIMATION_DURATION_MS, ITEM_ANIMATION_STAGGER_MS} from "./constants.ts";
import type {GridAnimationPhaseType} from "./types.ts";

const revealItem = keyframes`
    from { opacity: 0; scale: 0.95; }
    to { opacity: 1; scale: 1; }
`;

const hideItem = keyframes`
    from { opacity: 1; scale: 1; }
    to { opacity: 0; scale: 0.95; }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 0;
    max-width: 100%;
`;

export const Raw = styled.div`
    display: flex;
    justify-content: center;
    min-width: 0;
    max-width: 100%;
`;

export const RowsStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    flex-shrink: 1;
`;

export const GridViewportStyled = styled.div`
    display: flex;
    width: max-content;
    justify-content: center;
    align-self: center;
    min-width: 0;
    max-width: 100%;
    flex-shrink: 1;
    transition: width ${GRID_RESIZE_DURATION_MS}ms ease-in-out,
        height ${GRID_RESIZE_DURATION_MS}ms ease-in-out;

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

export const ItemWrapper = styled.span<{$phase: GridAnimationPhaseType; $index: number}>`
    display: inline-block;
    flex-shrink: 0;
    transform-origin: bottom center;

    & + & {
        margin-inline-start: calc(-1 * var(--item-overlap, 0px));
    }

    ${({$phase, $index}) => $phase !== "idle" && css`
        animation: ${$phase === "exiting" ? hideItem : revealItem}
            ${ITEM_ANIMATION_DURATION_MS}ms ease
            ${$index * ITEM_ANIMATION_STAGGER_MS}ms both;
    `}

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;
