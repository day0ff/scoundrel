import styled, {keyframes} from "styled-components";

const drainGlow = keyframes`
    0%, 100% { opacity: 0; }
    28% { opacity: 0.4; }
    55% { opacity: 0.3; }
    80% { opacity: 0.16; }
`;

const drainPotion = keyframes`
    0% { opacity: 1; transform: scale(1); filter: saturate(1); }
    18% { opacity: 1; transform: scale(1); filter: saturate(1); }
    42% { opacity: 1; transform: scale(1.04); filter: saturate(0.6); }
    72% { opacity: 1; transform: scale(1.04); filter: saturate(0); }
    100% { opacity: 1; transform: scale(1); filter: saturate(0); }
`;

const steamRise = keyframes`
    0% { opacity: 0; transform: translate(0, 0) scale(0.35); }
    20% { opacity: 0.65; }
    60% { opacity: 0.35; }
    100% { opacity: 0; transform: translate(var(--drift), -180px) scale(2.5); }
`;

export const DrainLayerStyled = styled.div<{$duration: number}>`
    position: fixed;
    inset: 0;
    z-index: 1200;
    pointer-events: none;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at center, #dff6ff 0%, skyblue 22%, #56b5de66 42%, transparent 72%);
        animation: ${drainGlow} ${({$duration}) => $duration}ms ease-out both;
    }
`;

export const DrainCardsStyled = styled.div<{$columns: number}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    grid-template-columns: repeat(${({$columns}) => $columns}, minmax(0, 1fr));
    gap: clamp(4px, 1.5vmin, 14px);
    width: min(90vw, ${({$columns}) => $columns * 145}px);
    max-height: 80vh;
`;

export const DrainFlightStyled = styled.div`
    min-width: 0;
    aspect-ratio: 2 / 3;
    transform-origin: top left;
    will-change: transform;
`;

export const DrainPotionStyled = styled.div<{$duration: number; $delay: number}>`
    width: 100%;
    height: 100%;
    min-width: 0;
    aspect-ratio: 2 / 3;
    filter: drop-shadow(0 0 18px #87ceeb88);
    animation: ${drainPotion} ${({$duration}) => $duration}ms ease-out ${({$delay}) => $delay}ms both;

    @media (prefers-reduced-motion: reduce) {
        animation-name: ${drainGlow};
    }
`;

export const DrainSteamStyled = styled.span<{
    $x: number;
    $y: number;
    $size: number;
    $delay: number;
    $duration: number;
    $drift: number;
}>`
    --drift: ${({$drift}) => $drift}px;
    position: absolute;
    left: ${({$x}) => $x}%;
    top: ${({$y}) => $y}%;
    width: ${({$size}) => $size}px;
    height: ${({$size}) => $size * 1.5}px;
    border-radius: 50%;
    opacity: 0;
    background: radial-gradient(ellipse, #edfbffcc, #87ceeb66 45%, transparent 72%);
    filter: blur(5px);
    animation: ${steamRise} ${({$duration}) => $duration}ms ease-out ${({$delay}) => $delay}ms both;

    @media (prefers-reduced-motion: reduce) {
        animation-name: ${drainGlow};
    }
`;
