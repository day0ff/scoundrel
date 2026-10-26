import styled from "styled-components";
import { TextStrokeWithShadowStyle } from "styles";

export const ZoneTitleStyled = styled.h2`
  && {
    font-size: ${({ theme }) => theme.fontSize.huge};

    @media ${({ theme }) => theme.media.tablet} {
      font-size: ${({ theme }) => theme.fontSize.large};
    }
  }
  text-align: center;
  ${TextStrokeWithShadowStyle};
  color: whitesmoke;
`;

export const CardsWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 12px 0 24px;

  @media ${({ theme }) => theme.media.tablet} {
    margin: 8px 0 12px;
  }
`;
