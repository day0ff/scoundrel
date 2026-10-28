import styled from "styled-components";
import {getColoredTextStrokeStyle} from "styles/TextStrokeStyle.ts";

export const CardStatStyled = styled.span`
    position: absolute;
    right: 16px;
    top: 16px;
    z-index: 2;
    color: lavender;
    font-size: 24px;
    line-height: 1;
    pointer-events: auto;
    cursor: help;
    ${getColoredTextStrokeStyle("black", 2)};
`;
