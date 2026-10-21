import styled from "styled-components";
import {TextStrokeWithShadowStyle} from "styles";

export const HeroTitleStyled = styled.h2`
    font-size: ${({theme}) => theme.fontSize.huge};
    text-align: center;
    ${TextStrokeWithShadowStyle};
    color: #222222;
`;

export const CardsWrapperStyled = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 780px;
    flex-direction: column;
    align-items: center;
    margin: 12px 0 24px;
`;
