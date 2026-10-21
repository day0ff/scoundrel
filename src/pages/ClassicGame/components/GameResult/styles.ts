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
    width: min(800px, calc(100vw - 32px));
    box-sizing: border-box;
    color: #f1edda;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 24px;

    h1 { color: #f4d77f; margin: 0; }
    p { margin: 0; line-height: 1.4; }
    a { color: inherit; }
    nav { display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap; }

    button {
        min-height: 44px;
        min-width: 0;
        max-width: 100%;
        white-space: normal;
        overflow-wrap: anywhere;

        &:focus {
            outline: none;
        }
    }

    @media ${({theme}) => theme.media.laptop} {
        gap: 20px;
        h1 { font-size: 32px; }
    }

    @media ${({theme}) => theme.media.tablet} {
        gap: 16px;
        font-size: 18px;
        h1 { font-size: 28px; }
        nav { gap: 16px; }
        button { font-size: 18px; }
    }

    @media ${({theme}) => theme.media.mobile} {
        gap: 16px;
        font-size: 16px;
        h1 { font-size: 24px; }
        nav { flex-direction: column; align-items: stretch; gap: 16px; }
        button { font-size: 16px; padding: 8px 12px; }
    }

    @media ${({theme}) => theme.media.laptop} and (orientation: landscape) and (max-height: 480px) {
        gap: 8px;
        h1 { font-size: 24px; }
        nav { gap: 16px; }
        nav + button { margin-top: 8px; }
    }
`;
