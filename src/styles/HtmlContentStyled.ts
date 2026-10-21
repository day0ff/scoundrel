import styled from "styled-components";

export const HtmlContentStyled = styled.section`
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    & > * {
        pointer-events: initial;
    }
`;
