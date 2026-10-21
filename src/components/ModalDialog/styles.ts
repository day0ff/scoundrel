import styled from "styled-components";
import {ButtonStyled, PixelCardStyled} from "styles";

export const ModalContentStyled = styled(PixelCardStyled)`
    position: relative;
    padding: 32px;
    background-color: dimgray;
    text-align: center;
`;

export const ModalButtonsContainerStyled = styled.div`
    display: flex;
    gap: 16px;
`;

export const ModalEnterButtonStyled = styled(ButtonStyled)`
    background-color: #b90000;
`;

export const ModalBackButtonStyled = styled(ButtonStyled)`
    background-color: darkorange;
`;