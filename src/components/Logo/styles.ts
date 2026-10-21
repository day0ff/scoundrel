import styled from "styled-components";

export const LogoStyled = styled.a`
    user-select: none;
    filter: invert(1) drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black);
    padding: 8px 0 0;
    transition: padding 0.3s ease-in;

    &:hover, &:focus {
        padding: 0 0 8px;
        transition: padding-bottom steps(1);
    }
`;

export const LogoImageStyled = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
`;
