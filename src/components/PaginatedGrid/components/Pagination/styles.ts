import styled from "styled-components";
import {ButtonStyled} from "styles";

export const PaginationStyled = styled.div`
    display: flex;
    justify-content: center;
    gap: 4px;
    align-items: center;
    align-self: center;
    max-width: 100%;
    min-width: 0;
    flex-wrap: nowrap;
`;

export const PageIndicesStyled = styled.div<{$fadeLeft: boolean; $fadeRight: boolean}>`
    display: flex;
    gap: 8px;
    min-width: 0;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    padding: 8px;
    mask-image: linear-gradient(
        to right,
        ${({$fadeLeft}) => $fadeLeft ? "transparent" : "black"},
        black 24px,
        black calc(100% - 24px),
        ${({$fadeRight}) => $fadeRight ? "transparent" : "black"}
    );

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const PaginationButton = styled(ButtonStyled)`
    margin: 0 8px;
    padding: 8px 12px;
    background-color: #b90000;
    user-select: none;
    width: auto;
    min-width: 44px;
    min-height: 44px;
    flex-shrink: 0;
    @media ${({theme}) => theme.media.tablet} {
        padding: 8px;
        font-size: 18px;
        margin-inline: 4px;
    }
`;


export const PageButton = styled(PaginationButton)<{ $active: boolean }>`
    margin: 0;
    background: ${(p) => (p.$active ? "darkorange" : "#b90000")};

    @media ${({theme}) => theme.media.tablet} {
        margin: 0;
    }
`;
