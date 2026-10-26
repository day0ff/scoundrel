import styled from "styled-components";
import { PageContainerStyled } from "styles";
import { CollectionsTitleStyled } from "componentsShared/Collections/styles.ts";
import { DungeonRoomsStyled } from "components/DungeonRooms/styles.ts";

export const DungeonPreviewStyled = styled(PageContainerStyled).attrs({
  as: "main",
})`
  min-height: 100dvh;
  height: auto;
  box-sizing: border-box;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  isolation: isolate;
  overflow: visible;

  ${DungeonRoomsStyled} {
    flex-shrink: 0;
  }

  @media ${({ theme }) => theme.media.laptop} {
    padding: 24px;
    gap: 20px;
  }

  @media ${({ theme }) => theme.media.tablet} {
    padding: 24px 16px;
    gap: 16px;
  }

  @media ${({ theme }) => theme.media.mobile} {
    gap: 12px;
  }

  @media (orientation: landscape) and (max-height: 480px) {
    padding: max(12px, env(safe-area-inset-top))
      max(16px, env(safe-area-inset-right))
      max(12px, env(safe-area-inset-bottom))
      max(16px, env(safe-area-inset-left));
    gap: 12px;
  }
`;

export const DungeonPreviewTitleStyled = styled(CollectionsTitleStyled).attrs({
  as: "h1",
})`
  font-size: 64px;
  margin: 0;
  max-width: 100%;
  line-height: 1.3;
  overflow-wrap: anywhere;
  color: red;
  text-shadow:
    -1px -1px 0 black,
    -1px 2px 0 black,
    1px -1px 0 black,
    1px 1px 0 black,
    0 4px 2px darkgray,
    -2px -2px 2px maroon,
    -2px 4px 2px maroon,
    2px -2px 2px maroon,
    2px 8px 4px maroon;

  @media ${({ theme }) => theme.media.laptop} {
    font-size: 40px;
  }

  @media ${({ theme }) => theme.media.tablet} {
    font-size: 28px;
  }

  @media ${({ theme }) => theme.media.mobile} {
    font-size: 20px;
  }

  @media (orientation: landscape) and (max-height: 480px) {
    font-size: 24px;
  }
`;

export const DungeonPreviewParagraphStyled = styled.p`
  max-width: 950px;
  margin: 0;
  font-size: 24px;
  line-height: 1.5;
  text-align: center;
  color: wheat;
  text-shadow:
    -1px -1px 0 black,
    -1px 1px 0 black,
    1px -1px 0 black,
    1px 1px 0 black,
    0 2px 4px whitesmoke;
  white-space: pre-line;

  @media ${({ theme }) => theme.media.laptop} {
    font-size: 18px;
  }

  @media ${({ theme }) => theme.media.tablet} {
    font-size: 16px;
  }

  @media (orientation: landscape) {
    max-width: 720px;
  }
`;

export const ActionsStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  max-width: 100%;

  > input {
    box-sizing: border-box;
    max-width: 100%;
    min-height: 44px;
    padding: 4px 8px;

    &:hover {
      padding: 2px 8px 6px;
    }
  }

  @media ${({ theme }) => theme.media.laptop} {
    > input {
      font-size: 28px;
      letter-spacing: -2px;
    }
  }

  @media ${({ theme }) => theme.media.tablet} {
    margin-top: -8px;
    > input {
      font-size: 24px;
      letter-spacing: -2px;
    }
  }

  @media ${({ theme }) => theme.media.mobile} {
    > input {
      font-size: 18px;
    }
    gap: 0;
  }

  @media (orientation: landscape) and (max-height: 480px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px 8px;

    > input {
      font-size: 22px;
      letter-spacing: -2px;
    }
  }
`;
