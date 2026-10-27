import styled from "styled-components";
import {animated} from "@react-spring/web";

export const PackBackgroundStyled = styled(animated.div)<{$url: string}>`
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background-image: url(${({$url}) => $url});
    background-size: cover;
    background-position: bottom center;
`;
