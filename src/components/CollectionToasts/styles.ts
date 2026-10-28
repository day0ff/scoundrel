import styled from "styled-components";

export const CollectionToastsStyled = styled.div`
    position: fixed;
    inset: 24px auto auto 24px;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: whitesmoke;
    width: max-content;
    max-width: calc(100vw - 32px);
    max-height: calc(100dvh - 32px);
    overflow: hidden;
    overflow: clip;
    z-index: 11000;

    &::backdrop {
        background: transparent;
        pointer-events: none;
    }

    @media ${({theme}) => theme.media.mobile} {
        top: 16px;
        left: 16px;
    }
`;
