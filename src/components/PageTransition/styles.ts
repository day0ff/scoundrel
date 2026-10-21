import styled, { keyframes } from "styled-components";
import {
  CardFacetBackStyled,
  CardFacetStyled,
} from "components/Card/styles.ts";
import { OldScreenStyle } from "styles/OldScreenStyle.ts";
import {
  PasteboardCardMarkStyled,
  PasteboardCardMarkRankStyled,
  PasteboardCardSuitStyled,
} from "components/PasteboardCard/components/PasteboardCardMark/styles.ts";
import {
  CARD_BACK_HOLD_DURATION_MS,
  CARD_EXIT_DURATION_MS,
  CARD_FADE_DURATION_MS,
  CARD_RETURN_HOLD_DURATION_MS,
  CARD_REVEAL_DURATION_MS,
  CURTAIN_DURATION_MS,
  CURTAIN_OFFSETS,
} from "./constants.ts";
import type { CurtainCornerType } from "./types.ts";

const revealCard = keyframes`
    from { transform: rotateY(180deg); }
    to { transform: rotateY(0deg); }
`;

const returnCard = keyframes`
    from { transform: rotateY(0deg); }
    to { transform: rotateY(180deg); }
`;

const appearCard = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

export const CurtainsStyled = styled.div`
  position: absolute;
  inset: 0;
`;

export const PageTransitionStyled = styled.dialog<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  width: 100vw;
  height: 100dvh;
  max-width: none;
  max-height: none;
  background: transparent;
  outline: none;
  z-index: 10000;
  overflow: hidden;
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  touch-action: none;
  user-select: none;
  isolation: isolate;

  ${OldScreenStyle};

  &::backdrop {
    background: transparent;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;

export const CurtainStyled = styled.div<{
  $corner: CurtainCornerType;
  $closed: boolean;
  $opening: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  /* Each rotated panel spans the viewport's full diagonal projection. */
  width: calc(70.710679vw + 70.710679dvh + 4px);
  height: calc(70.710679vw + 70.710679dvh + 4px);
  --curtain-distance: ${({ $closed }) =>
    $closed ? "calc(25vw + 25dvh)" : "calc(50vw + 50dvh + 4px)"};
  background: black;
  transform: translate(-50%, -50%)
    translate(${({ $corner }) => CURTAIN_OFFSETS[$corner]}) rotate(45deg);
  transition: transform ${CURTAIN_DURATION_MS}ms cubic-bezier(0.65, 0, 0.35, 1);
  transition-delay: ${({ $opening }) =>
    $opening ? CARD_EXIT_DURATION_MS : 0}ms;
  will-change: transform;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.045;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='white' filter='url(%23noise)' d='M0 0h128v128H0z'/%3E%3C/svg%3E");
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 1ms;
    transition-delay: 0ms;
  }
`;

export const CardStageStyled = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity ${CARD_FADE_DURATION_MS}ms ease-out;
  transition-delay: ${({ $visible }) =>
    $visible ? 0 : CARD_REVEAL_DURATION_MS + CARD_RETURN_HOLD_DURATION_MS}ms;
  animation: ${appearCard} ${CARD_FADE_DURATION_MS}ms ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 1ms;
    transition-delay: 0ms;
    animation: none;
  }
`;

export const CardRevealStyled = styled.div<{ $opening: boolean }>`
  position: relative;
  width: min(240px, 60vw, 40dvh);
  aspect-ratio: 2 / 3;
  container-type: inline-size;
  transform-style: preserve-3d;
  animation: ${({ $opening }) => ($opening ? returnCard : revealCard)}
    ${CARD_REVEAL_DURATION_MS}ms ease-in-out
    ${({ $opening }) => ($opening ? 0 : CARD_BACK_HOLD_DURATION_MS)}ms both;

  ${CardFacetStyled}, ${CardFacetBackStyled} {
    backface-visibility: hidden;
  }

  ${PasteboardCardMarkStyled} {
    top: 10cqw;
    left: 10cqw;
  }

  ${PasteboardCardMarkRankStyled} {
    font-size: 15cqw;
  }

  ${PasteboardCardSuitStyled} {
    margin-inline-start: -2cqw;
    width: 20cqw;
    height: 20cqw;
  }

  @media ${({ theme }) => theme.media.laptop} {
    width: min(200px, 60vw, 40dvh);
  }

  @media ${({ theme }) => theme.media.tablet} {
    width: min(160px, 60vw, 40dvh);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
