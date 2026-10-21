import styled from "styled-components";

export const TooltipContentStyled = styled.span<{ $isRoot?: boolean; }>`
    display: inline-block;
    max-width: 80vw;
    min-width: ${({$isRoot}) => $isRoot ? 'auto' : '160px'};
    font-size: ${({theme}) => theme.fontSize.small};
    font-family: ${({theme}) => theme.fontFamily.text};
    letter-spacing: -2px;
    white-space: pre-line;

    & & {
        min-width: fit-content;
    }
`;