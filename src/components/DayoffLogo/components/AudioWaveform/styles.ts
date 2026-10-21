import styled from "styled-components";

export const CanvasStyled = styled.canvas`
    position: absolute;
    left: 50%;
    top: 38%;
    width: 100%;
    min-width: 800px;
    max-width: none;
    height: 400px;
    transform: translateX(-50%);
    pointer-events: none;
`;
