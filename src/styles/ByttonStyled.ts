import styled from "styled-components";
import {BorderStyle} from "./BorderStyle.ts";
import {TextStrokeWithShadowStyle} from "./TextStrokeWithShadowStyle.ts";

export const ButtonStyled = styled.button`
    box-sizing: border-box;
    width: 100%;
    padding: 8px 64px;
    font-size: ${({theme}) => theme.fontSize.large};
    cursor: pointer;
    pointer-events: auto;
    color: whitesmoke;

    ${BorderStyle};
    ${TextStrokeWithShadowStyle};

    &:hover, &:focus {
        filter: brightness(120%);
    }
    &[disabled] {
        filter: brightness(60%);
    }
    &:active:enabled {
        transform: translateY(4px);
        box-shadow: 0 4px black, 0 -4px black, 4px 0 black, -4px 0 black, inset 0 4px #00000033;
    }
`;