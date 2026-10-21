import styled from "styled-components";

export const TitleStyled = styled.h1`
    margin: 0;
    padding: 0 16px;
    color: navajowhite;
    font-size: ${({theme}) => theme.fontSize.huge};
    line-height: ${({theme}) => theme.lineHeight.huge};
    text-shadow: -1px -1px 0 #624b00, -1px 2px 0 #624b00, 1px -1px 0 #624b00, 1px 1px 0 #624b00, 0 4px 2px darkgray, 0 0 8px gold, 0 0 12px gold;
    text-align: center;
`;