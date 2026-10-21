import styled from "styled-components";
import { ButtonStyled } from "styles/ByttonStyled.ts";

export const TurnButtonStyled = styled(ButtonStyled)<{ $canSkip: boolean }>`
  background-color: ${({ $canSkip }) => ($canSkip ? "indigo" : "#b90000")};
  padding: 8px 16px;
  width: calc(4ch + 40px);
  line-height: 1.4;
  white-space: nowrap;

  @media (orientation: portrait) {
    font-size: 16px;
    padding: 8px;
  }
`;
