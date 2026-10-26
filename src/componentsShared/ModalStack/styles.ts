import styled from "styled-components";
import {
  ButtonStyled,
  CornerSizeType,
  getPixelCardCornerBySizeStyle,
  getPixelCardPathBySizeStyle,
  PixelCardStyled,
} from "styles";
import Modal from "components/Modal";
import {ModalAnimationStyle, ModalCloseButton} from "components/Modal/styles.ts";

export const ModalStyled = styled(Modal)<{ $size?: CornerSizeType }>`
  box-sizing: border-box;
  max-width: calc(100vw - 32px);
  max-height: calc(100dvh - 32px);
  ${ModalAnimationStyle};

  ${ModalCloseButton} {
    width: 44px;
    height: 44px;
    top: 4px;
    right: 4px;
  }

  &::after {
    ${getPixelCardPathBySizeStyle}
  }
`;

export const ModalContentStyled = styled.div<{ $size?: CornerSizeType; $hasCloseButton?: boolean }>`
  position: relative;
  padding: 32px;
  box-sizing: border-box;
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
  min-width: 0;
  ${getPixelCardCornerBySizeStyle}

  @media ${({theme}) => theme.media.tablet} {
    padding: 24px;
  }

  @media ${({theme}) => theme.media.mobile}, ${({theme}) => theme.media.laptop} and (orientation: landscape) and (max-height: 480px) {
    padding: 16px;
  }

  ${({$hasCloseButton}) => $hasCloseButton && "padding-top: 52px;"}
`;

export const ModalPixelCardStyled = styled(PixelCardStyled)`
  position: absolute;
  inset: 0;
  background-color: dimgray;
`;

export const ModalBackButtonStyled = styled(ButtonStyled)`
  background-color: darkorange;
  min-height: 44px;
  @media ${({theme}) => theme.media.tablet} {
    padding: 8px 16px;
    font-size: 18px;
  }
`;
