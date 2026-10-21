import styled from "styled-components";
import { ButtonStyled, InputStyled } from "styles";

export const ProfilesContainerStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  width: 100%;
  min-width: 0;
`;

export const ProfilesInputStyled = styled(InputStyled)`
  margin-bottom: 24px;
  max-width: 400px;
  letter-spacing: -2px;
  background-color: blue;
  min-height: 44px;
  @media ${({theme}) => theme.media.tablet} {
    padding: 8px 12px;
    font-size: 20px;
    margin-bottom: 16px;
  }
  box-shadow:
    0 4px blue,
    0 -4px blue,
    4px 0 blue,
    -4px 0 blue;

  &:hover,
  &:focus {
    box-shadow:
      0 4px blue,
      0 -4px blue,
      4px 0 blue,
      -4px 0 blue,
      0 10px #00000033;
  }
`;

export const ProfilesButtonBasStyled = styled(ButtonStyled)`
  margin-bottom: 24px;
  min-height: 44px;
  overflow-wrap: anywhere;
  @media ${({theme}) => theme.media.tablet} {
    padding: 8px 12px;
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

export const ProfilesButtonLoadStyled = styled(ProfilesButtonBasStyled)`
  background-color: purple;
`;

export const ProfilesButtonCreateStyled = styled(ProfilesButtonBasStyled)`
  background-color: darkred;
`;

export const ProfilesButtonSaveStyled = styled(ProfilesButtonBasStyled)`
  background-color: darkgreen;
`;
