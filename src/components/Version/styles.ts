import styled from "styled-components";
import {TextStrokeWithShadowStyle} from "styles";

export const VersionStyled = styled.span`
    font-family: ${({theme}) => theme.fontFamily.number};
    font-size: 16px;
    color: whitesmoke;
    pointer-events: none;
    user-select: none;

    ${TextStrokeWithShadowStyle};
`;
