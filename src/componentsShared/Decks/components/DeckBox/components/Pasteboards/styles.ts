import styled from "styled-components";
import {TextStrokeWithShadowStyle} from "styles";
import {PasteboardDraggableCardStyled} from "components/PasteboardCard/styles.ts";
import {
    PasteboardCardMarkStyled, PasteboardCardMarkRankStyled, PasteboardCardSuitStyled,
} from "components/PasteboardCard/components/PasteboardCardMark/styles.ts";

export const PasteboardsTitleStyled = styled.h2`
    font-size: ${({theme}) => theme.fontSize.huge};
    text-align: center;
    ${TextStrokeWithShadowStyle};
    color: #db1e38;
    margin: 0;
    line-height: 1.4;
    @media ${({theme}) => theme.media.tablet} {
        font-size: 28px;
    }
    @media ${({theme}) => theme.media.mobile}, ${({theme}) => theme.media.laptop} and (orientation: landscape) and (max-height: 480px) {
        font-size: 22px;
    }
`;

export const CardsWrapperStyled = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    margin: 12px 0 24px;
    max-width: 100%;
    min-width: 0;

    ${PasteboardDraggableCardStyled} {
        container-type: inline-size;
        ${PasteboardCardMarkStyled} { top: 8.333cqw; left: 8.333cqw; }
        ${PasteboardCardMarkRankStyled} { font-size: 20cqw; }
        ${PasteboardCardSuitStyled} { width: 26.667cqw; height: 26.667cqw; margin-inline-start: -3.333cqw; }
    }
    @media ${({theme}) => theme.media.laptop} {
        ${PasteboardDraggableCardStyled} { width: 140px; }
    }
    @media ${({theme}) => theme.media.tablet} {
        ${PasteboardDraggableCardStyled} { width: 120px; }
    }
`;
