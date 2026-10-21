import styled from "styled-components";

export const HtmlScreenViewStyled = styled.div`
    position: absolute;
    margin: 0 auto;
    inset: 0;
    pointer-events: none;

    & > * {
        pointer-events: initial;
    }
`;
