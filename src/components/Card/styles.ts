import styled from "styled-components";
import {animated} from "@react-spring/web";
import {CornerSizeType, getPixelCardCornerBySizeStyle, getPixelCardPathBySizeStyle, PixelCardStyled} from "styles";

export const CardInner = styled(animated.div)`
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
`;

export const PixelCardFaceStyled = styled(PixelCardStyled)`
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    background-color: transparent;
    user-select: none;
    overflow: visible;
    pointer-events: none;
`;

export const MarkTop = styled.span<{ $color?: string }>`
    position: absolute;
    top: 30px;
    left: 30px;
    writing-mode: vertical-lr;
    text-orientation: upright;
    font-size: 36px;
    font-family: ${({theme}) => theme.fontFamily.text};
    letter-spacing: -10px;

    &::first-letter {
        text-transform: capitalize;
        font-size: 42px;
        font-weight: bolder;
        ${({$color}) => `color: ${$color}`};
        text-shadow: -1px -1px 0 black, -1px 2px 0 black, 1px -1px 0 black, 1px 1px 0 black;
    }
`;

export const CardImage = styled.img`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
`;

export const GlossLayer = styled(animated.div)`
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    mix-blend-mode: luminosity;
    background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 25%, 
            rgba(255, 255, 255, 0.5) 50%, 
            rgba(255, 255, 255, 0) 75%
    );
    background-size: 200% 200%;
    filter: blur(16px);
`;

export const CardFacetStyled = styled.div<{ $size?: CornerSizeType }>`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    //backface-visibility: hidden;
    background-color: transparent;
    user-select: none;
    transform: translateZ(2px);
    
    ${getPixelCardCornerBySizeStyle};

    & > :is(${CardImage}, ${GlossLayer}) {
        ${getPixelCardPathBySizeStyle};
    }
`;

export const CardFacetBackStyled = styled(CardFacetStyled)`
    transform: rotateY(180deg) translateZ(2px);
`;