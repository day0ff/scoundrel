import styled from "styled-components";
import {animated, WithAnimated} from "@react-spring/web";

type DraggableCardWrapperPropsType = {
    $isSelectable?: boolean;
    $isSelected: boolean;
};

export const transitionStyle = 'margin-top 0.4s ease-in-out, margin-bottom 0.4s ease-in-out, filter 0.4s ease-in-out';

export const DraggableCardWrapper = styled(animated.div).attrs<WithAnimated & DraggableCardWrapperPropsType>(({$isSelectable}) => ({
    tabIndex: $isSelectable ? 0 : -1,
}))<DraggableCardWrapperPropsType>`
    margin: 0 -150px 16px;
    margin-top: ${({$isSelected}) => $isSelected ? "0px" : "16px"};
    margin-bottom: ${({$isSelected}) => $isSelected ? "16px" : "0px"};
    padding: 8px;
    width: 300px;
    aspect-ratio: 2 / 3;
    position: relative;
    z-index: ${({$isSelectable, $isSelected}) => $isSelectable ? $isSelected ? "5" : "1" : "0"};
    perspective: 1000px;
    pointer-events: ${({$isSelectable}) => $isSelectable ? 'auto' : 'none'};
    filter: ${({$isSelected}) => $isSelected ? "drop-shadow(8px 12px 0 #00000099)" : "drop-shadow(4px 4px 0 #00000099)"};
    transition: ${transitionStyle};

    &:hover, &:focus, &:focus-within {
        z-index: 11;
        margin-top: ${({$isSelected}) => $isSelected ? "0px" : "8px"};
        margin-bottom: ${({$isSelected}) => $isSelected ? "16px" : "8px"};
        filter: drop-shadow(8px 12px 0 #00000099);
    }

    @media ${({theme}) => theme.media.tablet} and (orientation: landscape) {
        margin-top: ${({$isSelected}) => $isSelected ? "0px" : "8px"};
        margin-bottom: ${({$isSelected}) => $isSelected ? "8px" : "0px"};

        &:hover, &:focus, &:focus-within {
            margin-top: ${({$isSelected}) => $isSelected ? "0px" : "4px"};
            margin-bottom: ${({$isSelected}) => $isSelected ? "8px" : "4px"};
            filter: drop-shadow(4px 8px 0 #00000099);
        }
    }
`;
