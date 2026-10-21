import styled from "styled-components";
import ModalStack from "componentsShared/ModalStack";
import {ModalContentStyled} from "componentsShared/ModalStack/styles.ts";

export const HeaderMenuModalStyled = styled(ModalStack)`
    width: min(640px, calc(100vw - 32px));
    pointer-events: auto;

    ${ModalContentStyled} {
        display: flex;
        flex-direction: column;
        min-height: 75dvh;
        gap: 16px;
    }
`;
