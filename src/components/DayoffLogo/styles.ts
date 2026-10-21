import styled from "styled-components";

export const ContainerStyled = styled.div<{$dark: boolean}>`
    --logo-foreground: ${({$dark}) => $dark ? "white" : "black"};
    --logo-background: ${({$dark}) => $dark ? "black" : "white"};
    position: relative;
    isolation: isolate;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 400px;
    overflow: hidden;
    color: var(--logo-foreground);
    background: var(--logo-background);
    font-family: "ShareTechMono", monospace;
    transition: color 1.2s, background-color 1.2s;
`;
