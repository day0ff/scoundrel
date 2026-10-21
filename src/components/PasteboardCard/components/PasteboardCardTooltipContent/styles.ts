import styled from "styled-components";
import CardTooltipContent from "components/CardTooltipContent";
import {CardTooltipTitleStyled} from "components/CardTooltipContent/styles.ts";

export const PasteboardCardTooltipContentStyled = styled(CardTooltipContent)<{$color?: string}>`
    & ${CardTooltipTitleStyled} {
        color: ${({$color}) => $color ?? 'darkgreen'};
        text-shadow: -1px -1px 0 ${({$color}) => $color ?? 'darkgreen'}, -1px 1px 0 #00000099, 0 2px 1px #00000099, 0 4px 1px darkgray;
    }
`;
