import styled from "styled-components";

import Version from "components/Version";

export const HeaderStyled = styled.header`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: calc(100% - 20px);
  height: 32px;
  top: 10px;
`;

export const MainStyled = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-height: 100dvh;
  padding: clamp(32px, 8dvh, 96px) 24px 96px;
  gap: 32px;

  @media ${({ theme }) => theme.media.tablet} {
    padding: 140px 16px 80px;
    gap: 12px;
  }

  @media (orientation: landscape) {
    gap: 12px;
    padding: max(32px, env(safe-area-inset-top))
      max(16px, env(safe-area-inset-right))
      max(32px, env(safe-area-inset-bottom))
      max(18px, env(safe-area-inset-left));
  }
`;

export const MenuStyled = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-content: stretch;
  min-width: 0;
  max-width: 100%;
  margin-top: auto;
  gap: 16px;

  input {
    box-sizing: border-box;
    max-width: 100%;
    min-height: 44px;
    padding: 8px;
    &:hover {
      padding: 4px 8px 12px;
    }
  }

  @media ${({ theme }) => theme.media.laptop} {
    input {
      font-size: 32px;
      letter-spacing: -2px;
    }
  }

  @media ${({ theme }) => theme.media.tablet} {
    margin-top: 0;
    gap: 8px;
    input {
      font-size: 24px;
    }
  }

  @media ${({ theme }) => theme.media.mobile} {
    gap: 0;
    input {
      font-size: 20px;
    }
  }

  @media (orientation: landscape) and (max-height: 480px) {
    margin-top: 0;
    gap: 8px;
    input {
      font-size: 22px;
      letter-spacing: -2px;
    }
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
  @media ${({ theme }) => theme.media.mobile} {
    > a {
      max-width: 140px;
    }
  }
`;

export const VersionStyled = styled(Version)(() => ({
  alignSelf: "flex-end",
}));
