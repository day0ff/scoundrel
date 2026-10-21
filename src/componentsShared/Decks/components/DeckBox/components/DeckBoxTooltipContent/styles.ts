import styled from "styled-components";
import CardTooltipContent from "components/CardTooltipContent";
import {CardTooltipTitleStyled} from "components/CardTooltipContent/styles.ts";

export const DeckBoxTooltipContentStyled = styled(CardTooltipContent)<{color: string}>`
    & ${CardTooltipTitleStyled} {
        color: ${({color}) => color};
        text-shadow: -1px -1px 0 ${({color}) => color}, -1px 1px 0 #00000099, 0 2px 1px #00000099, 0 4px 1px darkgray;
    }
`;

