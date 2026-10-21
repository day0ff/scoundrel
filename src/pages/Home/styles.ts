import styled, { keyframes } from "styled-components";
import Version from "components/Version";
import DayoffLogo from "components/DayoffLogo";
import {WordmarkStyled} from "components/DayoffLogo/components/Wordmark/styles.ts";
import {CanvasStyled} from "components/DayoffLogo/components/AudioWaveform/styles.ts";

const flicker = keyframes`
    0%, 45%, 55%, 65%, 100% {
        color: var(--flicker-primary);
    }
    50%, 60% {
        color: var(--flicker-secondary);
    }
`;

export const HomeStyled = styled.main`
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  box-sizing: border-box;
  padding: 24px 24px 72px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: white;
  color: #222222;
  user-select: none;

  @media ${({theme}) => theme.media.tablet} {
    padding: max(16px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) 64px max(16px, env(safe-area-inset-left));
  }

  @media (orientation: landscape) and (max-height: 480px) {
    padding-top: max(12px, env(safe-area-inset-top));
    padding-bottom: 56px;
  }
`;

export const TitleStyled = styled.h1`
  --flicker-primary: black;
  --flicker-secondary: #777777;
  margin: 0;
  padding: 24px;
  font-size: clamp(16px, 4vw, 32px);
  text-align: center;
  max-width: 100%;
  box-sizing: border-box;
  line-height: 1.5;
  overflow-wrap: anywhere;
  animation: ${flicker} 4s infinite alternate;
  text-shadow:
    -1px -1px 0 white,
    -1px 2px 0 white,
    1px -1px 0 white,
    1px 1px 0 white,
    0 4px 2px darkgray,
    0 0 8px white,
    0 0 12px white;
  cursor: pointer;

  &:hover {
    --flicker-primary: #777777;
    --flicker-secondary: black;
    padding: 20px 24px 28px;
  }

  @media ${({theme}) => theme.media.mobile} {
    padding: 16px 8px;

    &:hover {
      padding: 12px 8px 20px;
    }
  }

  @media (orientation: landscape) and (max-height: 480px) {
    font-size: clamp(16px, 6vh, 24px);
  }
`;

export const FooterStyled = styled.footer`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  height: 32px;
  left: max(10px, env(safe-area-inset-left));
  right: max(10px, env(safe-area-inset-right));
  bottom: max(10px, env(safe-area-inset-bottom));
  user-select: none;

  > a {
    min-width: 0;
    max-width: 180px;
    height: 32px;
    box-sizing: border-box;
  }

  @media ${({theme}) => theme.media.mobile} {
    gap: 8px;

    > a {
      max-width: 140px;
    }
  }
`;

export const VersionStyled = styled(Version)`
  align-self: flex-end;
  flex-shrink: 0;

  @media ${({theme}) => theme.media.mobile} {
    font-size: 14px;
  }
`;

export const DayoffLogoStyled = styled(DayoffLogo)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  min-height: 0;

  ${WordmarkStyled} {
    font-size: clamp(24px, 8vw, 64px);
  }

  @media ${({theme}) => theme.media.tablet} {
    ${CanvasStyled} {
      min-width: 0;
    }
  }

  @media (orientation: landscape) and (max-height: 480px) {
    ${WordmarkStyled} {
      font-size: clamp(24px, 12vh, 48px);
    }

    ${CanvasStyled} {
      height: 100%;
    }
  }
`;
