import styled from "styled-components";

export const LanguageStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;

  button {
    min-height: 44px;
    overflow-wrap: anywhere;
    padding: 8px 12px;
    border: 1px solid #c5ba87;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  button:focus-visible {
    outline: 3px solid #f4d77f;
    outline-offset: 2px;
  }
`;

export const TriggerStyled = styled.button`
  display: flex;
  justify-content: space-between;
  background: #d2a052;
  color: #000;
`;

export const OptionsStyled = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  background: #000;
  border: 1px solid #c5ba87;

  button {
    box-sizing: border-box;
    border: 0;
    background: #000;
    color: #f1edda;
  }

  button[aria-selected="true"] {
    background: #d2a052;
    color: #000;
  }

  button:not([aria-selected="true"]):hover,
  button:not([aria-selected="true"]):focus {
    background: #666;
    color: #f1edda;
  }

  button:focus-visible {
    outline-offset: -3px;
  }
`;
