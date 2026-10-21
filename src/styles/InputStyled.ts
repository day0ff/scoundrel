import styled from "styled-components";
import {TextStrokeWithShadowStyle} from "./TextStrokeWithShadowStyle.ts";

export const InputStyled = styled.input`
    box-sizing: border-box;
    width: 100%;
    padding: 8px 64px;
    cursor: pointer;
    pointer-events: auto;
    color: whitesmoke;
    font-size: ${({theme}) => theme.fontSize.large};
    text-align: center;
    border: none;
    border-radius: 0;
    box-shadow: 0 4px black, 0 -4px black, 4px 0 black, -4px 0 black;
    caret-color: whitesmoke;
    
    ${TextStrokeWithShadowStyle};

    &::placeholder {
        color: whitesmoke;
        opacity: 0.8;
        text-shadow: none;
    }
    
    &:hover, &:focus {
        box-shadow: 0 4px black, 0 -4px black, 4px 0 black, -4px 0 black, 0 10px #00000033;
    }

    &[disabled] {
        filter: brightness(60%);
    }
`;