import styled, {keyframes} from "styled-components";
import {TextStrokeWithShadowStyle} from "styles";

const flicker = keyframes`
    0%, 45%, 55%, 65%, 100% {
        color: gold;
    }
    50%, 60% {
        color: #bf9e00;
    }
`;

export const MenuButtonStyled = styled.input.attrs({
    type: "button",
})`
    padding: 8px;
    user-select: none;
    text-align: center;
    text-transform: capitalize;
    text-decoration: none;
    font-size: 48px;
    letter-spacing: -4px;
    color: #d2a052;
    border: none;
    background-color: transparent;
    transition: color 0.4s ease, padding0 .4s ease-in, text-shadow 0.4s linear;

    ${TextStrokeWithShadowStyle};

    &:hover {
        padding: 4px 8px 12px;
        transition: padding steps(1);
    }

    &:hover, &:focus {
        animation: ${flicker} 4s infinite alternate;
        color: gold;
        transition: color steps(1), text-shadow steps(1);
        text-shadow: -1px -1px 0 #624b00, -1px 2px 0 #624b00, 1px -1px 0 #624b00, 1px 1px 0 #624b00, 0 4px 2px darkgray, 0 0 8px gold, 0 0 12px gold;
    }
`;
