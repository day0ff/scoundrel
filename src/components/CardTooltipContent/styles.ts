import styled from "styled-components";
import {TooltipContentStyled} from "components/TooltipContent/styles.ts";

export const CardTooltipContentStyled = styled.span`
    display: flex;
    flex-direction: column;
    max-width: 80vw;
    width: 100%;
    letter-spacing: -2px;
    white-space: pre-line;
`;

export const CardTooltipTitleStyled = styled.span`
    padding: 12px 6px 6px;
    font-size: var(--card-tooltip-title-font-size, 34px);
    line-height: 1.3;
    overflow-wrap: anywhere;

    @media ${({theme}) => theme.media.tablet} {
        font-size: 28px;
    }

    @media ${({theme}) => theme.media.mobile}, ${({theme}) => theme.media.laptop} and (orientation: landscape) and (max-height: 480px) {
        font-size: 22px;
    }
`;

export const CardTooltipDescriptionStyled = styled.span`
    padding: 6px;
    font-size: ${({theme}) => theme.fontSize.small};
    
    & ${TooltipContentStyled} {
        font-size: ${({theme}) => theme.fontSize.small};
    }
`;
