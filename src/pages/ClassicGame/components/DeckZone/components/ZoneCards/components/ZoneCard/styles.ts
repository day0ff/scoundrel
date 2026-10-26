import styled from "styled-components";
import {DraggableCardWrapper} from "components/DraggableCard/styles.ts";
import {
    PasteboardCardMarkStyled, PasteboardCardMarkRankStyled, PasteboardCardSuitStyled,
} from "components/PasteboardCard/components/PasteboardCardMark/styles.ts";

export const ZoneCardStyled = styled(DraggableCardWrapper)`
    margin-left: 0;
    margin-right: 0;
    padding: 0;
    width: clamp(80px, 14vw, 150px);
    cursor: pointer;

    @media ${({theme}) => theme.media.laptop} {
        width: 140px;
        container-type: inline-size;

        ${PasteboardCardMarkStyled} { top: 8.333cqw; left: 8.333cqw; }
        ${PasteboardCardMarkRankStyled} { font-size: 20cqw; }
        ${PasteboardCardSuitStyled} { width: 26.667cqw; height: 26.667cqw; margin-inline-start: -3.333cqw; }
    }

    @media ${({theme}) => theme.media.tablet} {
        width: 120px;
    }
`;
