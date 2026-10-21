import styled from "styled-components";
import {ButtonStyled, TextStrokeWithShadowStyle} from "styles";

export const CollectionsTitleStyled = styled.h2`
    margin-bottom: 48px;
    font-size: ${({theme}) => theme.fontSize.huge};
    text-align: center;
    ${TextStrokeWithShadowStyle};
    color: whitesmoke;
`;

export const CollectionsButtonsContainerStyled = styled.div`
    margin-bottom: 48px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 24px;
`;

export const CollectionsButtonStyled = styled(ButtonStyled)`
    padding: 16px 24px;
    background-color: #b90000;
    font-size: ${({theme}) => theme.fontSize.medium};
`;
