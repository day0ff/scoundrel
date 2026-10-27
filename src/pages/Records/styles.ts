import styled from "styled-components";
import { OldScreenStyle, PixelCardStyled } from "styles";
import MenuButton from "pages/MainMenu/components/MenuButton";
import { PackBoxDraggableDeckStyled } from "componentsShared/Packs/components/PackBox/styles.ts";

export const RecordsStyled = styled(PixelCardStyled).attrs({ as: "main" })<{
  $url: string;
}>`
  position: relative;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  background-image: url(${({ $url }) => $url});
  background-size: cover;
  background-position: bottom center;
  min-height: 0;
  height: 100dvh;
  overflow: hidden;
  color: #f1edda;

  ${OldScreenStyle};
`;

export const RecordsScrollStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-gutter: stable;
  padding: calc(96px + clamp(28px, 5vw, 56px)) 24px 48px;
  gap: 24px;

  > * {
    flex-shrink: 0;
  }
`;

export const RecordsTitleStyled = styled.h1`
  position: absolute;
  top: 48px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  max-width: calc(100% - 24px);
  text-align: center;
  margin: 0;
  font-size: clamp(28px, 5vw, 56px);
  color: #d2a052;
  text-shadow: 2px 3px 0 #000;

  @media ${({ theme }) => theme.media.mobile} {
    top: 52px;
  }
`;

export const RecordsPanelStyled = styled(PixelCardStyled)`
  position: relative;
  width: min(100%, 960px);
  background-color: dimgray;
  filter: drop-shadow(0px 8px 0px #00000099);
  overflow: hidden;
`;

export const TabsStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px;
  border-bottom: 1px solid #8c693b;
`;

export const RecordsModeTitleStyled = styled.h2`
  margin: 0;
  padding: 16px 16px 0;
  font-size: clamp(20px, 3vw, 28px);
  color: #d2a052;
  text-shadow: 1px 2px 0 #000;
  text-align: center;
`;

export const RecordsHeaderStyled = styled.header`
  position: absolute;
  inset: 0 0 auto;
  z-index: 1;
  pointer-events: none;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 24px;

  @media ${({ theme }) => theme.media.laptop} {
    padding: 8px 16px;
  }

  @media ${({ theme }) => theme.media.tablet} {
    padding: 4px 8px;
  }

  @media ${({ theme }) => theme.media.mobile} {
    padding: 4px;
  }
`;

export const RecordsHeaderButtonStyled = styled(MenuButton)`
  pointer-events: auto;
  font-size: 36px;
  letter-spacing: -3px;
  max-width: 100%;
  min-width: 0;
  min-height: 44px;
  box-sizing: border-box;
  text-overflow: ellipsis;

  @media ${({ theme }) => theme.media.laptop} {
    font-size: 30px;
    letter-spacing: -2px;
  }

  @media ${({ theme }) => theme.media.tablet} {
    font-size: 24px;
    letter-spacing: -1px;
  }

  @media ${({ theme }) => theme.media.mobile} {
    font-size: clamp(18px, 5vw, 24px);
    letter-spacing: 0;
  }
`;

export const TabStyled = styled.button`
  position: relative;
  width: fit-content;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;
  filter: brightness(0.7);

  &[aria-selected="true"] {
    filter: drop-shadow(0 0 6px #d2a052);
  }

  &:focus-visible {
    outline: 2px solid gold;
    outline-offset: 4px;
  }
`;

export const TabPackBoxStyled = styled(PackBoxDraggableDeckStyled).attrs({
  size: 2,
  wobbleIntensity: 0,
  wobbleSpeed: 0,
})`
  width: 80px;
  @media ${({ theme }) => theme.media.tablet} {
    width: 60px;
  }
`;

export const TableScrollStyled = styled.div`
  overflow-x: auto;
`;

export const RecordsTableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 18px;
  line-height: 1.5;
  caption {
    padding: 20px 16px;
    text-align: start;
    color: #d2a052;
  }
  th,
  td {
    padding: 14px 16px;
    text-align: start;
    border-bottom: 1px solid #8c693b55;
  }
  thead {
    background: #0004;
  }
  tbody th {
    overflow-wrap: anywhere;
    max-width: 320px;
    font-weight: normal;
  }
  td:last-child {
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  @media ${({ theme }) => theme.media.mobile} {
    font-size: 13px;
    th,
    td {
      padding: 12px 8px;
    }
  }
`;

export const EmptyStyled = styled.p`
  margin: 0;
  padding: 32px 16px;
  text-align: center;
  line-height: 1.6;
`;
