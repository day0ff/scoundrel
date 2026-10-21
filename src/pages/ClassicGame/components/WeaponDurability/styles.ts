import styled from "styled-components";
import { getColoredTextStrokeStyle } from "styles/TextStrokeStyle.ts";

export const WeaponDurabilityStyled = styled.span`
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 2;
  color: lavender;
  font-size: 16px;
  line-height: 1;
  text-align: center;
  pointer-events: auto;
  cursor: help;
  ${getColoredTextStrokeStyle("black", 2)};
`;
