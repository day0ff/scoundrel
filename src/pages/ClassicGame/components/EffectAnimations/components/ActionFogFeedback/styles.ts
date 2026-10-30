import styled, {keyframes} from "styled-components";
import {FOG_FADE_MS} from "./constants.ts";

const fogIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const fogOut = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
`;

const fogDrift = keyframes`
    0% { transform: translate(-5%, 2%) scale(1); }
    50% { transform: translate(5%, -3%) scale(1.08); }
    100% { transform: translate(-5%, 2%) scale(1); }
`;

export const FogLayerStyled = styled.div<{$color: string; $visible: boolean}>`
    --action-fog-color: ${({$color}) => $color};
    position: fixed;
    inset: 0;
    z-index: 1100;
    overflow: hidden;
    pointer-events: none;
    animation: ${({$visible}) => $visible ? fogIn : fogOut} ${FOG_FADE_MS}ms ease-in-out both;
`;

export const FogCloudStyled = styled.div`
    position: absolute;
    inset: -25%;
    opacity: 0.32;
    background:
        radial-gradient(ellipse at 18% 65%, var(--action-fog-color), transparent 42%),
        radial-gradient(ellipse at 68% 35%, color-mix(in srgb, var(--action-fog-color) 70%, transparent), transparent 38%),
        radial-gradient(ellipse at 90% 80%, var(--action-fog-color), transparent 44%);
    filter: blur(28px);
    animation: ${fogDrift} 8s ease-in-out infinite;

    &:nth-child(2) {
        opacity: 0.24;
        animation-duration: 11s;
        animation-delay: -4s;
        animation-direction: reverse;
        background:
            radial-gradient(ellipse at 28% 25%, var(--action-fog-color), transparent 40%),
            radial-gradient(ellipse at 75% 75%, var(--action-fog-color), transparent 45%);
    }

    &:nth-child(3) {
        opacity: 0.2;
        animation-duration: 6s;
        animation-delay: -2s;
        background: radial-gradient(ellipse at 50% 80%, var(--action-fog-color), transparent 58%);
    }

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

const fogParticleDrift = keyframes`
    0% { opacity: 0; transform: translate3d(0, 30px, 0) scale(0.5); }
    25% { opacity: 0.45; }
    70% { opacity: 0.25; }
    100% { opacity: 0; transform: translate3d(var(--particle-drift), -180px, 0) scale(2); }
`;

export const FogParticleStyled = styled.span<{
    $x: number;
    $y: number;
    $size: number;
    $drift: number;
    $duration: number;
    $delay: number;
}>`
    --particle-drift: ${({$drift}) => $drift}px;
    position: absolute;
    left: ${({$x}) => $x}%;
    top: ${({$y}) => $y}%;
    width: ${({$size}) => $size}px;
    height: ${({$size}) => $size * 1.6}px;
    border-radius: 50%;
    opacity: 0;
    background: radial-gradient(ellipse, var(--action-fog-color), transparent 70%);
    filter: blur(3px);
    animation: ${fogParticleDrift} ${({$duration}) => $duration}ms ease-in-out ${({$delay}) => $delay}ms infinite;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
        opacity: 0.15;
    }
`;
