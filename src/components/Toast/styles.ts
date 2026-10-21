import styled from "styled-components";

export const ToastStyled = styled.div`
    position: absolute;
    top: 24px;
    right: 24px;
    width: min(480px, calc(100% - 48px));
    z-index: 1100;
    pointer-events: none;
`;
