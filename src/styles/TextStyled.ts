import styled from "styled-components";

export const TextStyled = styled.p`
    font-size: ${({theme}) => theme.fontSize.huge};
    line-height: ${({theme}) => theme.lineHeight.huge};
    color: wheat;
    text-shadow:
        -1px -1px 0 black,
        -1px 1px 0 black,
        1px -1px 0 black,
        1px 1px 0 black,
        0 2px 4px whitesmoke;
    white-space: pre-line;
`;