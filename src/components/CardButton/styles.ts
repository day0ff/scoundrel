import styled, {css, keyframes} from "styled-components";
import {CornerSizeType} from "styles";

export const flicker = keyframes`
    0%, 45%, 55%, 65%, 100% {
        filter: brightness(100%);
    }
    50%, 60% {
        filter: brightness(120%);
    }
`;

const CardCornerBottom4Radius = css`
    clip-path: polygon(
            0 0,
            100% 0,
            100% calc(100% - 8px),
            calc(100% - 4px) calc(100% - 8px),
            calc(100% - 4px) calc(100% - 4px),
            calc(100% - 8px) calc(100% - 4px),
            calc(100% - 8px) 100%,
            8px 100%,
            8px calc(100% - 4px),
            4px calc(100% - 4px),
            4px calc(100% - 8px),
            0 calc(100% - 8px)
    );
`;

export const CardButtonBorderStyled = styled.span<{ $size?: CornerSizeType }>`
    z-index: -1;
    display: inline-block;
    position: absolute;
    left: 50%;
    bottom: 0;
    background: black;
    transform: translate(-50%, 0);
    transition: transform 0.4s ease;
    ${CardCornerBottom4Radius};
    animation: ${flicker} 6s infinite alternate;
    &:hover, &:focus-within {
        animation: none;
    }
`;

export const CardButtonStyled = styled.button<{ $size?: CornerSizeType }>`
    box-sizing: border-box;
    margin: 4px;
    padding: 12px 20px;
    border: none;
    background: whitesmoke;
    transition: filter 0.4s ease, background-color 0.4s ease;
    ${CardCornerBottom4Radius};

    &:hover, &:focus {
        filter: brightness(140%);
    }
    
    &[disabled] {
        filter: brightness(60%);
    }
`;
