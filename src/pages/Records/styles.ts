import styled from "styled-components";
import {OldScreenStyle, PixelCardStyled} from "styles";
import MenuButton from "pages/MainMenu/components/MenuButton";

export const RecordsStyled = styled(PixelCardStyled).attrs({as: "main"})<{$url: string}>`
    position: relative;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    background-image: url(${({$url}) => $url});
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
    height: 100%;
    min-height: 0;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-gutter: stable;
    padding: 48px 24px;
    gap: 24px;

    > * { flex-shrink: 0; }

    @media ${({theme}) => theme.media.mobile} {
        padding: 24px 12px;
        gap: 16px;
    }
`;

export const RecordsTitleStyled = styled.h1`
    margin: 0;
    font-size: clamp(28px, 5vw, 56px);
    color: #d2a052;
    text-shadow: 2px 3px 0 #000;
`;

export const RecordsPanelStyled = styled(PixelCardStyled)`
    position: relative;
    width: min(100%, 960px);
    background-color: dimgray;
    filter: drop-shadow(0px 8px 0px #00000099);
    overflow: hidden;

    > input { margin: 16px; max-width: calc(100% - 32px); }
`;

export const TabsStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 16px;
    border-bottom: 1px solid #8c693b;
`;

export const RecordsButtonStyled = styled(MenuButton)`
    box-sizing: border-box;
    max-width: 100%;
    min-height: 44px;
    font-size: 28px;
    letter-spacing: -1px;
    cursor: pointer;
    &, &:focus, &:focus-visible { outline: none; }
    &:disabled { opacity: 0.5; cursor: default; }

    @media ${({theme}) => theme.media.mobile} {
        font-size: 20px;
    }
`;

export const TabStyled = styled(RecordsButtonStyled)`
    &[aria-selected="true"] { color: gold; }
`;

export const TableScrollStyled = styled.div`
    overflow-x: auto;
`;

export const RecordsTableStyled = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 18px;
    line-height: 1.5;
    caption { padding: 20px 16px; text-align: start; color: #d2a052; }
    th, td { padding: 14px 16px; text-align: start; border-bottom: 1px solid #8c693b55; }
    thead { background: #0004; }
    tbody th { overflow-wrap: anywhere; max-width: 320px; font-weight: normal; }
    td:last-child { white-space: nowrap; font-variant-numeric: tabular-nums; }

    @media ${({theme}) => theme.media.mobile} {
        font-size: 13px;
        th, td { padding: 12px 8px; }
    }
`;

export const EmptyStyled = styled.p`
    margin: 0;
    padding: 32px 16px;
    text-align: center;
    line-height: 1.6;
`;
