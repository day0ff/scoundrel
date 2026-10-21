import styled, {css} from "styled-components";
import {OldScreenStyle} from "styles";
import {MODAL_BACKDROP_DURATION_MS, MODAL_EXIT_DURATION_MS, MODAL_REVEAL_DURATION_MS} from "./constants.ts";

export const ModalAnimationStyle = css`
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity ${MODAL_EXIT_DURATION_MS}ms ease-in,
    transform ${MODAL_EXIT_DURATION_MS}ms ease-in;

  &[data-modal-visible="true"] {
    opacity: 1;
    transform: translateY(0);
    transition-duration: ${MODAL_REVEAL_DURATION_MS}ms;
    transition-timing-function: ease-out;
    transition-delay: ${MODAL_BACKDROP_DURATION_MS}ms;
  }

  &::backdrop {
    ${OldScreenStyle};
    clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
    transition: clip-path ${MODAL_BACKDROP_DURATION_MS}ms
      cubic-bezier(0.65, 0, 0.35, 1);
  }

  &[data-modal-visible="true"]::backdrop {
    /* The diamond's radius must reach the viewport corners at every aspect ratio. */
    clip-path: polygon(
      50% calc(50% - 50vw - 50dvh - 2px),
      calc(50% + 50vw + 50dvh + 2px) 50%,
      50% calc(50% + 50vw + 50dvh + 2px),
      calc(50% - 50vw - 50dvh - 2px) 50%
    );
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    &[data-modal-visible="true"],
    &::backdrop {
      transition: none;
      transform: none;
    }
  }

`;

export const ModalStyled = styled.dialog`
    position: relative;
    max-width: calc(90vw - 20px);
    max-height: calc(90vh - 20px);
    overflow: visible;
    padding: 0;
    pointer-events: auto;
    background: none;
    border: none;
    filter: drop-shadow(0px 8px 0px #00000099);
    
    ${OldScreenStyle};

    &::backdrop {
        background: repeating-linear-gradient(0deg, #00000066, #00000066 1px, #A9A9A933 1px, #A9A9A999 2px);
    }
`;

export const ModalCloseButton = styled.button`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    padding: 0;
    width: 20px;
    height: 20px;
    top: 12px;
    right: 12px;
    aspect-ratio: 1;
    background: none;
    border: none;
    cursor: pointer;
    filter: drop-shadow(0 2px 0 darkgray);

    &:hover {
        align-items: flex-start;

        & > * {
            background-color: #222222;
        }
    }
`;

export const ModalCloseButtonIcon = styled.span`
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: black;
    border: none;
    clip-path: polygon(0px 0px, 4px 0px, 4px 4px, 8px 4px, 8px 8px, 12px 8px, 12px 12px, 8px 12px, 8px 8px, 4px 8px, 4px 4px, 0px 4px, 0px 0px, 0px 12px, 4px 12px, 4px 8px, 8px 8px, 8px 4px, 12px 4px, 12px 0px, 8px 0px, 8px 4px, 8px 8px, 4px 8px, 0px 8px, 0px 12px);
`;