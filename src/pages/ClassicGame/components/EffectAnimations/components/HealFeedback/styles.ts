import styled, {keyframes} from "styled-components";

export const HealingEffectsLayerStyled = styled.div`
    position: fixed;
    inset: 0;
    z-index: 105;
    pointer-events: none;
`;

const potionReveal = keyframes`
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.55); }
    22% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    55% { opacity: 1; transform: translate(-50%, -50%) scale(1.04); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(1.15); }
`;

const potionFade = keyframes`
    0%, 100% { opacity: 0; }
    22%, 55% { opacity: 1; }
`;

const potionGlow = keyframes`
    0%, 100% { opacity: 0; }
    25% { opacity: 0.45; }
    55% { opacity: 0.3; }
`;

export const HealPotionStyled = styled.div<{$duration: number}>`
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: clamp(110px, 25vmin, 170px);
    aspect-ratio: 2 / 3;
    filter: drop-shadow(0 0 16px #eac75b55);
    animation: ${potionReveal} ${({$duration}) => $duration}ms ease-out both;

    &::after {
        content: "";
        position: absolute;
        inset: -25%;
        z-index: 2;
        pointer-events: none;
        background: radial-gradient(ellipse, #fff1a3 0%, #eac75b88 35%, transparent 70%);
        animation: ${potionGlow} ${({$duration}) => $duration}ms ease-out both;
    }

    @media (prefers-reduced-motion: reduce) {
        transform: translate(-50%, -50%);
        animation-name: ${potionFade};
    }
`;

const healingGlow = keyframes`
    0% { opacity: 0.12; }
    6% { opacity: 0.22; }
    65% { opacity: 0.16; }
    100% { opacity: 0; }
`;

const healingParticle = keyframes`
    0% { opacity: 0.4; transform: translate(0, 0) scale(0.6); }
    10% { opacity: 0.9; transform: translate(calc(var(--drift) * 0.25), -6px) scale(1); }
    60% { opacity: 0.65; }
    100% { opacity: 0; transform: translate(var(--drift), -30px) scale(0.3); }
`;

export const HealGlowStyled = styled.div<{$duration: number}>`
    position: fixed;
    inset: 0;
    z-index: 1100;
    pointer-events: none;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        z-index: 2;
        inset: 0;
        background: radial-gradient(ellipse at 50% 60%, #eac75b 0%, #d5ab36 20%, transparent 75%);
        animation: ${healingGlow} ${({$duration}) => $duration}ms ease-out both;
    }

    @media (prefers-reduced-motion: reduce) {
        &::before { animation-timing-function: linear; }
    }
`;

export const HealParticleStyled = styled.span<{
    $x: number;
    $y: number;
    $size: number;
    $delay: number;
    $duration: number;
    $drift: number;
}>`
    --drift: ${({$drift}) => $drift}px;
    position: absolute;
    z-index: 3;
    left: ${({$x}) => $x}%;
    top: ${({$y}) => $y}%;
    width: ${({$size}) => $size}px;
    height: ${({$size}) => $size}px;
    border-radius: 50%;
    opacity: 0;
    background: #fff0a3;
    box-shadow: 0 0 6px 2px #f4d35c99, 0 0 16px 4px #e9bc3933;
    animation: ${healingParticle} ${({$duration}) => $duration}ms ease-out ${({$delay}) => $delay}ms forwards;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
        opacity: 0.45;
    }
`;
