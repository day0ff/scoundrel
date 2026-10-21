import styled from "styled-components";

export const DefaultLoaderStyled = styled.div<{ $isVisible: boolean }>`
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    color: black;
    background: white;
    z-index: 9999;
    opacity: ${({$isVisible}) => ($isVisible ? 1 : 0)};
    pointer-events: ${({$isVisible}) => ($isVisible ? "auto" : "none")};
    transition: opacity 0.4s ease;
`;