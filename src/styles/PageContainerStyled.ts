import styled from "styled-components";

export const PageContainerStyled = styled.div<{$url?: string}>`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    background-image: url(${({$url}) => $url});
    background-size: cover;
    background-position: bottom center;
    min-height: 100vh;
    overflow: hidden;
`;
