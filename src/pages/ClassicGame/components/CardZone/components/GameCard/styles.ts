import styled, {css, keyframes} from "styled-components";
import {PasteboardCardMarkRankStyled, PasteboardCardSuitStyled} from "components/PasteboardCard/components/PasteboardCardMark/styles.ts";
import {PixelCardStyled} from "styles";
import {DraggableCardWrapper} from "components/DraggableCard/styles.ts";
import type {PasteboardRoleType} from "entities/pasteboards/types.ts";
import {CARD_INTERACTION_COLORS} from "../../../../constants.ts";

export const GameCardMarkStyle = css`
    ${PasteboardCardMarkRankStyled} {
        font-size: 28px;
    }

    ${PasteboardCardSuitStyled} {
        width: 36px;
        height: 36px;
        margin-inline-start: -4px;
    }
`;

export const GameCardStyled = styled.div<{$role: PasteboardRoleType}>`
    ${GameCardMarkStyle};
    position: relative;
    --card-interaction-color: ${({$role}) => CARD_INTERACTION_COLORS[$role]};

    &[data-drag-active="false"] ${DraggableCardWrapper}:is(:hover, :focus) ${PixelCardStyled}::after,
    &:not([data-card-zone="room"])[data-drag-active="false"] ${DraggableCardWrapper}[data-selected="true"] ${PixelCardStyled}::after,
    &:not([data-card-zone="room"])[data-drop-target="true"] ${PixelCardStyled}::after,
    &[data-targeted="true"] ${PixelCardStyled}::after {
        background: var(--card-interaction-color);
    }

    &[data-card-zone="room"]:is([data-drop-target="true"], [data-targeted="true"]) ${DraggableCardWrapper},
    &[data-card-zone="weapons"][data-drop-target="true"] ${DraggableCardWrapper},
    &[data-replacement-target="true"] ${DraggableCardWrapper} {
        filter: drop-shadow(8px 12px 0 #00000099)
            drop-shadow(0 0 8px var(--card-interaction-color))
            drop-shadow(0 0 20px color-mix(in srgb, var(--card-interaction-color) 50%, transparent));
    }
`;


const strike = keyframes`
    0%, 30% { transform: rotate(-35deg) scaleX(0); opacity: 0; }
    36%, 48% { transform: rotate(-35deg) scaleX(1); opacity: 1; }
    75%, 100% { transform: rotate(-35deg) scaleX(1); opacity: 0; }
`;

export const StrikeStyled = styled.div<{$duration: number}>`
    position: absolute;
    z-index: 20;
    pointer-events: none;
    top: 50%;
    left: -15%;
    width: 130%;
    height: 5px;
    border-radius: 50%;
    background: #fff0ce;
    box-shadow: 0 0 16px 6px #f08060;
    animation: ${strike} ${({$duration}) => $duration}ms ease-out both;
    @media (prefers-reduced-motion: reduce) { animation: none; transform: rotate(-35deg); }
`;

