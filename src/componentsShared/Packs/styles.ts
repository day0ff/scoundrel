import styled from "styled-components";
import {TextStrokeWithShadowStyle} from "styles";

export const PacksTitleStyled = styled.h2`
    font-size: ${({theme}) => theme.fontSize.huge};
    text-align: center;
    ${TextStrokeWithShadowStyle};
    color: whitesmoke;
    margin: 0;
    line-height: 1.4;
    @media ${({theme}) => theme.media.tablet} {
        font-size: 28px;
        margin-bottom: -12px;
    }
    @media ${({theme}) => theme.media.mobile}, ${({theme}) => theme.media.laptop} and (orientation: landscape) and (max-height: 480px) {
        margin-bottom: -24px;    
        font-size: 22px;
    }
`;


export const PacksWrapperStyled = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: min(880px, 100%);
    min-width: 0;
    flex-direction: column;
    align-items: center;
    margin: 12px 0 24px;
`;
