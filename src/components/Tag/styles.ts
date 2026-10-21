import styled from "styled-components";

export const TagContentStyled = styled.span`
    font-size: ${({theme}) => theme.fontSize.small};
    font-family: ${({theme}) => theme.fontFamily.text};
    letter-spacing: -2px;
    white-space: pre-line;
`;