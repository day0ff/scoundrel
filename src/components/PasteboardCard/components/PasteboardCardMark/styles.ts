import styled from "styled-components";
import Rank from "components/TooltipContent/components/Rank/components/Rank";
import Suit from "components/TooltipContent/components/Suit/components/Suit";

export const PasteboardCardMarkStyled = styled.div`
    position: absolute;
    top: 15px;
    left: 15px;
    display: flex;
    flex-direction: column;
`;

export const PasteboardCardMarkRankStyled = styled(Rank)<{ $color?: string }>`
    font-size: 36px;
    ${({$color}) => `color: ${$color}`};
`;

export const PasteboardCardSuitStyled = styled(Suit)`
    margin-inline-start: -6px;
    width: 48px;
    height: 48px;
`;
