import styled from "styled-components";
import {animated} from "@react-spring/web";
import {CornerSizeType, getPixelCardCornerBySizeStyle, getPixelCardPathBySizeStyle, PixelCardStyled} from "styles";

export const LightweightCardInner = styled(animated.div)<{index: number;}>`
    position: absolute;
    top: ${({index}) => index * 3}px;
    left: ${({index}) => index * 3}px;
    width: 100%;
    height: 100%;
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

export const LightweightCardInnerImage = styled.img`
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

export const CardImage = styled.img`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
`;

export const LightweightCardFacetStyled = styled.div<{ $size?: CornerSizeType }>`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background-color: transparent;
    user-select: none;
    transform: translateZ(0px);

    ${getPixelCardCornerBySizeStyle};

    & > :is(${CardImage}, ${GlossLayer}) {
        ${getPixelCardPathBySizeStyle};
    }
`;

export const LightweightCardFacetBackStyled = styled(LightweightCardFacetStyled)`
    transform: rotateY(180deg) translateZ(0px);
`;