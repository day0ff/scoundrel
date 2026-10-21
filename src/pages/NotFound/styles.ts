import styled from "styled-components";
import MenuButton from "pages/MainMenu/components/MenuButton";
import {PageContainerStyled, TextStyled} from "styles";

export const NotFoundPageStyled = styled(PageContainerStyled)`
  min-height: 100svh;
  height: auto;
  padding: 48px 32px;
  gap: 54px;

  @media ${({theme}) => theme.media.tablet} {
    padding: 32px 24px;
    gap: 32px;
  }

  @media ${({theme}) => theme.media.mobile} {
    padding: 24px 16px;
    gap: 24px;
  }

  @media (orientation: landscape) and (max-height: 480px) {
    padding-top: 16px;
    padding-bottom: 16px;
    gap: 16px;
  }
`;

export const NotFoundTextStyled = styled(TextStyled)`
  margin: 0;
  max-width: 100%;
  text-align: center;
  overflow-wrap: anywhere;

  @media ${({theme}) => theme.media.tablet} {
    font-size: ${({theme}) => theme.fontSize.large};
    line-height: 1.5;
  }

  @media ${({theme}) => theme.media.mobile} {
    font-size: ${({theme}) => theme.fontSize.medium};
  }
`;

export const MenuButtonStyled = styled(MenuButton)`
  box-sizing: border-box;
  max-width: 100%;
  min-height: 44px;
  font-size: ${({ theme }) => theme.fontSize.huge};

  @media ${({theme}) => theme.media.tablet} {
    font-size: ${({theme}) => theme.fontSize.large};
    letter-spacing: -2px;
  }

  @media ${({theme}) => theme.media.mobile} {
    font-size: clamp(12px, 4vw, 19px);
    letter-spacing: -1px;
  }
`;
