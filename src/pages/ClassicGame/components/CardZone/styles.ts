import styled, {keyframes} from "styled-components";
import MainFrame from "components/MainFrame";
import { DraggableCardWrapper } from "components/DraggableCard/styles.ts";
import {CARD_REVEAL_MS, CARD_REMOVE_MS} from "./constants.ts";
import { PixelCardStyled } from "styles/PixelCardStyled.ts";

export const CardZoneStyled = styled.section`
  min-width: 0;
  width: 100%;
  max-width: 100%;
  justify-self: stretch;
  text-align: center;

`;

export const CardZoneFrameStyled = styled(MainFrame)`
  width: 100%;
`;

export const CardZoneTitleStyled = styled.div`
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;

  h2 {
    width: fit-content;
    max-width: 100%;
    margin: 0;
    font-size: 18px;
    overflow-wrap: anywhere;
  }
`;

export const CardsStyled = styled.div`
  --card-width: clamp(95px, 12vw, 150px);
  --card-gap: 16px;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  gap: var(--card-gap);
  align-items: center;
`;

const revealCard = keyframes`
  from { opacity: 0; transform: translate(-45px, -30px) rotateY(90deg) rotate(-8deg) scale(.85); }
  to { opacity: 1; transform: none; }
`;

const removeCard = keyframes`
  from { opacity: 1; transform: none; }
  to { opacity: 0; transform: translate(55px, -35px) rotate(12deg) scale(.7); }
`;

export const CardSlotStyled = styled.div`
  position: relative;
  width: var(--card-width);
  min-height: calc(clamp(95px, 12vw, 150px) * 1.5 + 32px);
  flex-shrink: 0;

  & + & {
    margin-inline-start: calc(-1 * var(--card-overlap, 0px));
  }

  &[data-card-animation="reveal"] { animation: ${revealCard} ${CARD_REVEAL_MS}ms ease-out both; }
  &[data-card-animation="remove"] { animation: ${removeCard} ${CARD_REMOVE_MS}ms ease-in both; }

  @media (prefers-reduced-motion: reduce) {
    &[data-card-animation] { animation-duration: 1ms; }
  }

  ${DraggableCardWrapper} {
    width: clamp(95px, 12vw, 150px);
    touch-action: none;
    outline: none;
    &[data-dragging="true"] {
      opacity: 0;
    }
  }
`;

export const EmptyCardStyled = styled(PixelCardStyled).attrs({ $color: "coral" })`
  position: absolute;
  top: 16px;
  left: 0;
  width: clamp(95px, 12vw, 150px);
  max-width: 100%;
  aspect-ratio: 2 / 3;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #09191088;
  color: sienna;
  font-size: clamp(20px, 4vw, 48px);
  pointer-events: none;

  &::after {
    --horizontal-dashes: repeating-linear-gradient(
      90deg, currentColor 0 8px, transparent 8px 14px
    );
    --vertical-dashes: repeating-linear-gradient(
      180deg, currentColor 0 8px, transparent 8px 14px
    );
    background:
      var(--horizontal-dashes) top / 100% 20px no-repeat,
      var(--horizontal-dashes) bottom / 100% 20px no-repeat,
      var(--vertical-dashes) left center / 20px calc(100% - 40px) no-repeat,
      var(--vertical-dashes) right center / 20px calc(100% - 40px) no-repeat;
  }
`;
