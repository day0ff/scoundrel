import styled, {keyframes} from "styled-components";
import {CardFacetStyled} from "components/Card/styles.ts";
import {OldScreenStyle} from "styles/OldScreenStyle.ts";
import {GameCardMarkStyle} from "../../../CardZone/components/GameCard/styles.ts";

export const AttackCardLayerStyled = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1200;
    pointer-events: none;

    ${GameCardMarkStyle};

    ${CardFacetStyled} {
        ${OldScreenStyle};

        &::after {
            border-radius: inherit;
        }
    }
`;

const feedback = keyframes`
    0% { opacity: 0.6; }
    15%, 75% { opacity: 1; }
    100% { opacity: 0; }
`;
export const AttackFeedbackStyled = styled.div<{$duration: number; $damaged: boolean}>`
    position: fixed;
    inset: 0;
    z-index: 1100;
    box-shadow: inset 0 0 60px 18px ${({$damaged}) => $damaged ? "#bd292999" : "#a0a0a066"};
    pointer-events: none;
    animation: ${feedback} ${({$duration}) => $duration}ms ease-out both;
    @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const assassinFlash = keyframes`
    0%, 15% { opacity: 1; }
    100% { opacity: 0; }
`;

export const AssassinFlashStyled = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1300;
    background: white;
    pointer-events: none;
    animation: ${assassinFlash} 1600ms ease-out both;
    @media (prefers-reduced-motion: reduce) { animation-duration: 300ms; }
`;
