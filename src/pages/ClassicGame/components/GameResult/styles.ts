import styled from "styled-components";
import {ModalContentStyled, ModalPixelCardStyled, ModalStyled} from "componentsShared/ModalStack/styles.ts";

export {ModalStyled as GameResultModalStyled};

export const GameResultBackgroundStyled = styled(ModalPixelCardStyled)<{$backgroundImage: string}>`
    background-image: linear-gradient(#696969b3, #696969e6), url(${({$backgroundImage}) => JSON.stringify($backgroundImage)});
    background-size: 100% 100%, 100% auto;
    background-position: center;
    background-repeat: no-repeat;
`;

export const GameResultStyled = styled(ModalContentStyled)`
    width: min(800px, calc(90vw - 20px));
    box-sizing: border-box;
    color: #f1edda;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 24px;

    h1 { color: #f4d77f; }
    a { color: inherit; }
    nav { display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap; }
`;
