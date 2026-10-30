import styled, {keyframes} from "styled-components";
import {CardFacetStyled} from "components/Card/styles.ts";
import {OldScreenStyle} from "styles/OldScreenStyle.ts";
import {GameCardMarkStyle} from "../../../CardZone/components/GameCard/styles.ts";

export const CallLayerStyled = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1200;
    overflow: hidden;
    pointer-events: none;
    ${GameCardMarkStyle};

    ${CardFacetStyled} { ${OldScreenStyle}; }
`;

const soundWave = keyframes`
    from { transform: translate(-50%, -50%) scale(0.1); opacity: 0.9; }
    to { transform: translate(-50%, -50%) scale(5); opacity: 0; }
`;

export const SoundWaveStyled = styled.div<{$duration: number; $delay: number}>`
    position: fixed;
    width: 220px;
    height: 220px;
    border: 3px solid #f4e4ad;
    border-radius: 50%;
    box-shadow: 0 0 16px #f4e4ad99, inset 0 0 16px #f4e4ad66;
    opacity: 0;
    animation: ${soundWave} ${({$duration}) => $duration * 0.6}ms ease-out ${({$delay}) => $delay}ms both;
    @media (prefers-reduced-motion: reduce) { animation: none; }
`;
