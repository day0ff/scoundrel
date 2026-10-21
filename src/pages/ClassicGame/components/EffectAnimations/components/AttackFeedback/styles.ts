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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    box-shadow: inset 0 0 60px 18px ${({$damaged}) => $damaged ? "#bd292999" : "#a0a0a066"};
    pointer-events: none;
    animation: ${feedback} ${({$duration}) => $duration}ms ease-out both;
    @media (prefers-reduced-motion: reduce) { animation: none; }
`;

export const AttackMessageStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: calc(100vw - 32px);
    padding: 10px 16px;
    border: 1px solid #f08060;
    border-radius: 8px;
    background: #17251ef5;
    color: #fff0ce;
    text-align: center;
`;
