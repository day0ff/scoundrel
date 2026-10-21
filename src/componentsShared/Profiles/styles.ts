import styled from "styled-components";
import { ButtonStyled, TextStrokeWithShadowStyle } from "styles";

export const ProfilesStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
`;

export const ProfilesTitleStyled = styled.h2`
  margin-bottom: 32px;
  font-size: ${({ theme }) => theme.fontSize.huge};
  text-align: center;
  ${TextStrokeWithShadowStyle};
  color: whitesmoke;
  line-height: 1.4;
  @media ${({theme}) => theme.media.tablet} {
    font-size: 28px;
    margin-bottom: 24px;
  }
  @media ${({theme}) => theme.media.mobile}, ${({theme}) => theme.media.laptop} and (orientation: landscape) and (max-height: 480px) {
    font-size: 22px;
    margin-bottom: 16px;
  }
`;

export const ProfilesButtonsContainerStyled = styled.div`
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  @media ${({theme}) => theme.media.tablet} {
    gap: 12px;
    margin-bottom: 16px;
  }
`;

export const ProfilesButtonProfileStyled = styled(ButtonStyled)<{
  $selected: boolean;
}>`
  background-color: #b90000;
  min-height: 44px;
  @media ${({theme}) => theme.media.tablet} {
    min-width: 0;
    padding: 8px 16px;
    font-size: 20px;
  }
  ${({ $selected }) =>
    $selected &&
    `
        transform: translateY(-8px);
        box-shadow: 0 4px black, 0 -4px black, 4px 0 black, -4px 0 black, 0 16px #00000033, 4px 4px #00000033, -4px 4px #00000033, inset 0 4px #ffffff33;
    `};
`;

export const ProfilesButtonSaveStyled = styled(ButtonStyled)`
  margin-bottom: 24px;
  background-color: green;
`;
