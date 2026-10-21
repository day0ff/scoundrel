import styled from "styled-components";
import CardTooltipContent from "components/CardTooltipContent";
import {CardTooltipTitleStyled} from "components/CardTooltipContent/styles.ts";
import {WaveStyled} from "components/TooltipContent/components/Formatters/components/WaveTypewriter/styles.ts";

export const HeroCardTooltipContentStyled = styled(CardTooltipContent)<{$color?: string}>`
    & ${CardTooltipTitleStyled} {
        color: #222222;
        text-shadow: -1px -1px 0 #222222, -1px 1px 0 #00000099, 0 2px 1px #00000099, 0 4px 1px darkgray;
        & ${WaveStyled} > span:nth-child(2) {
            color: ${({$color}) => $color};
        }
    }
`;
