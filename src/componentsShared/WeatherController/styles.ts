import styled from "styled-components";
import {PageContainerStyled} from "styles/PageContainerStyled.ts";

export const WeatherControllerStyled = styled.div`
    position: relative;
    width: 100%;
    min-height: 100dvh;

    > ${PageContainerStyled} {
        height: auto;
        min-height: 100dvh;
        overflow: visible;
    }
`;

export const FrontStyled = styled.div<{
    $url?: string;
    $parts: number;
    $index: number;
}>`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-image: url(${({$url}) => $url});
    background-size: cover;
    background-position: bottom center;
    min-height: 100dvh;
    overflow: hidden;
`;
