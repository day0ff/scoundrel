import styled from "styled-components";
import {TextStrokeWithShadowStyle} from "styles";

export const ZoneTitleStyled = styled.h2`
    && {
        font-size: ${({theme}) => theme.fontSize.huge};
    }
    text-align: center;
    ${TextStrokeWithShadowStyle};
`;

export const CardsWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 12px 0 24px;
`;
