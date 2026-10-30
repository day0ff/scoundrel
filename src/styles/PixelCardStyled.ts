import styled, {css} from "styled-components";

const CORNER_SIZE = [2, 4, 6, 8, 10] as const;
const CORNER_WIDTH = [2, 4, 6] as const;

export type CornerSizeType = typeof CORNER_SIZE[number];
export type CornerWidthType = typeof CORNER_WIDTH[number];

const PixelCardCorner10Radius = ($width: number) => css`
    clip-path: polygon(0px calc(100% - 7 * ${$width}px),
        ${$width}px calc(100% - 7 * ${$width}px),
        ${$width}px calc(100% - 5 * ${$width}px),
    calc(2 * ${$width}px) calc(100% - 5 * ${$width}px),
    calc(2 * ${$width}px) calc(100% - 3 * ${$width}px),
    calc(3 * ${$width}px) calc(100% - 3 * ${$width}px),
    calc(3 * ${$width}px) calc(100% - 2 * ${$width}px),
    calc(5 * ${$width}px) calc(100% - 2 * ${$width}px),
    calc(5 * ${$width}px) calc(100% - ${$width}px),
    calc(7 * ${$width}px) calc(100% - ${$width}px),
    calc(7 * ${$width}px) 100%,
    calc(100% - 7 * ${$width}px) 100%,
    calc(100% - 7 * ${$width}px) calc(100% - ${$width}px),
    calc(100% - 5 * ${$width}px) calc(100% - ${$width}px),
    calc(100% - 5 * ${$width}px) calc(100% - 2 * ${$width}px),
    calc(100% - 3 * ${$width}px) calc(100% - 2 * ${$width}px),
    calc(100% - 3 * ${$width}px) calc(100% - 3 * ${$width}px),
    calc(100% - 2 * ${$width}px) calc(100% - 3 * ${$width}px),
    calc(100% - 2 * ${$width}px) calc(100% - 5 * ${$width}px),
    calc(100% - ${$width}px) calc(100% - 5 * ${$width}px),
    calc(100% - ${$width}px) calc(100% - 7 * ${$width}px),
    100% calc(100% - 7 * ${$width}px),
    100% calc(7 * ${$width}px),
    calc(100% - ${$width}px) calc(7 * ${$width}px),
    calc(100% - ${$width}px) calc(5 * ${$width}px),
    calc(100% - 2 * ${$width}px) calc(5 * ${$width}px),
    calc(100% - 2 * ${$width}px) calc(3 * ${$width}px),
    calc(100% - 3 * ${$width}px) calc(3 * ${$width}px),
    calc(100% - 3 * ${$width}px) calc(2 * ${$width}px),
    calc(100% - 5 * ${$width}px) calc(2 * ${$width}px),
    calc(100% - 5 * ${$width}px) ${$width}px,
    calc(100% - 7 * ${$width}px) ${$width}px,
    calc(100% - 7 * ${$width}px) 0px,
    calc(7 * ${$width}px) 0px,
    calc(7 * ${$width}px) ${$width}px,
    calc(5 * ${$width}px) ${$width}px,
    calc(5 * ${$width}px) calc(2 * ${$width}px),
    calc(3 * ${$width}px) calc(2 * ${$width}px),
    calc(3 * ${$width}px) calc(3 * ${$width}px),
    calc(2 * ${$width}px) calc(3 * ${$width}px),
    calc(2 * ${$width}px) calc(5 * ${$width}px),
        ${$width}px calc(5 * ${$width}px),
        ${$width}px calc(7 * ${$width}px),
    0px calc(7 * ${$width}px));

    &::after {
        clip-path: polygon(0px calc(100% - 7 * ${$width}px),
            ${$width}px calc(100% - 7 * ${$width}px),
            ${$width}px calc(100% - 5 * ${$width}px),
        calc(2 * ${$width}px) calc(100% - 5 * ${$width}px),
        calc(2 * ${$width}px) calc(100% - 3 * ${$width}px),
        calc(3 * ${$width}px) calc(100% - 3 * ${$width}px),
        calc(3 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(5 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(5 * ${$width}px) calc(100% - ${$width}px),
        calc(7 * ${$width}px) calc(100% - ${$width}px),
        calc(7 * ${$width}px) 100%,
        calc(100% - 7 * ${$width}px) 100%,
        calc(100% - 7 * ${$width}px) calc(100% - ${$width}px),
        calc(100% - 5 * ${$width}px) calc(100% - ${$width}px),
        calc(100% - 5 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(100% - 3 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(100% - 3 * ${$width}px) calc(100% - 3 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(100% - 3 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(100% - 5 * ${$width}px),
        calc(100% - ${$width}px) calc(100% - 5 * ${$width}px),
        calc(100% - ${$width}px) calc(100% - 7 * ${$width}px),
        100% calc(100% - 7 * ${$width}px),
        100% calc(7 * ${$width}px),
        calc(100% - ${$width}px) calc(7 * ${$width}px),
        calc(100% - ${$width}px) calc(5 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(5 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(3 * ${$width}px),
        calc(100% - 3 * ${$width}px) calc(3 * ${$width}px),
        calc(100% - 3 * ${$width}px) calc(2 * ${$width}px),
        calc(100% - 5 * ${$width}px) calc(2 * ${$width}px),
        calc(100% - 5 * ${$width}px) ${$width}px,
        calc(100% - 7 * ${$width}px) ${$width}px,
        calc(100% - 7 * ${$width}px) 0px,
        calc(7 * ${$width}px) 0px,
        calc(7 * ${$width}px) ${$width}px,
        calc(5 * ${$width}px) ${$width}px,
        calc(5 * ${$width}px) calc(2 * ${$width}px),
        calc(3 * ${$width}px) calc(2 * ${$width}px),
        calc(3 * ${$width}px) calc(3 * ${$width}px),
        calc(2 * ${$width}px) calc(3 * ${$width}px),
        calc(2 * ${$width}px) calc(5 * ${$width}px),
            ${$width}px calc(5 * ${$width}px),
            ${$width}px calc(7 * ${$width}px),
        0px calc(7 * ${$width}px),
        0px 50%,
            ${$width}px 50%,
            ${$width}px calc(7 * ${$width}px),
        calc(2 * ${$width}px) calc(7 * ${$width}px),
        calc(2 * ${$width}px) calc(5 * ${$width}px),
        calc(3 * ${$width}px) calc(5 * ${$width}px),
        calc(3 * ${$width}px) calc(3 * ${$width}px),
        calc(5 * ${$width}px) calc(3 * ${$width}px),
        calc(5 * ${$width}px) calc(2 * ${$width}px),
        calc(7 * ${$width}px) calc(2 * ${$width}px),
        calc(7 * ${$width}px) ${$width}px,
        calc(100% - 7 * ${$width}px) ${$width}px,
        calc(100% - 7 * ${$width}px) calc(2 * ${$width}px),
        calc(100% - 5 * ${$width}px) calc(2 * ${$width}px),
        calc(100% - 5 * ${$width}px) calc(3 * ${$width}px),
        calc(100% - 3 * ${$width}px) calc(3 * ${$width}px),
        calc(100% - 3 * ${$width}px) calc(5 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(5 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(7 * ${$width}px),
        calc(100% - ${$width}px) calc(7 * ${$width}px),
        calc(100% - ${$width}px) calc(100% - 7 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(100% - 7 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(100% - 5 * ${$width}px),
        calc(100% - 3 * ${$width}px) calc(100% - 5 * ${$width}px),
        calc(100% - 3 * ${$width}px) calc(100% - 3 * ${$width}px),
        calc(100% - 5 * ${$width}px) calc(100% - 3 * ${$width}px),
        calc(100% - 5 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(100% - 7 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(100% - 7 * ${$width}px) calc(100% - ${$width}px),
        calc(7 * ${$width}px) calc(100% - ${$width}px),
        calc(7 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(5 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(5 * ${$width}px) calc(100% - 3 * ${$width}px),
        calc(3 * ${$width}px) calc(100% - 3 * ${$width}px),
        calc(3 * ${$width}px) calc(100% - 5 * ${$width}px),
        calc(2 * ${$width}px) calc(100% - 5 * ${$width}px),
        calc(2 * ${$width}px) calc(100% - 7 * ${$width}px),
            ${$width}px calc(100% - 7 * ${$width}px),
            ${$width}px 50%,
        0px 50%);
    }
`;

const PixelCardCorner8Radius = ($width: number) => css`
    clip-path: polygon(0px calc(100% - 5 * ${$width}px),
        ${$width}px calc(100% - 5 * ${$width}px),
        ${$width}px calc(100% - 3 * ${$width}px),
    calc(2 * ${$width}px) calc(100% - 3 * ${$width}px),
    calc(2 * ${$width}px) calc(100% - 2 * ${$width}px),
    calc(3 * ${$width}px) calc(100% - 2 * ${$width}px),
    calc(3 * ${$width}px) calc(100% - ${$width}px),
    calc(5 * ${$width}px) calc(100% - ${$width}px),
    calc(5 * ${$width}px) 100%,
    calc(100% - 5 * ${$width}px) 100%,
    calc(100% - 5 * ${$width}px) calc(100% - ${$width}px),
    calc(100% - 3 * ${$width}px) calc(100% - ${$width}px),
    calc(100% - 3 * ${$width}px) calc(100% - 2 * ${$width}px),
    calc(100% - 2 * ${$width}px) calc(100% - 2 * ${$width}px),
    calc(100% - 2 * ${$width}px) calc(100% - 3 * ${$width}px),
    calc(100% - ${$width}px) calc(100% - 3 * ${$width}px),
    calc(100% - ${$width}px) calc(100% - 5 * ${$width}px),
    100% calc(100% - 5 * ${$width}px),
    100% calc(5 * ${$width}px),
    calc(100% - ${$width}px) calc(5 * ${$width}px),
    calc(100% - ${$width}px) calc(3 * ${$width}px),
    calc(100% - 2 * ${$width}px) calc(3 * ${$width}px),
    calc(100% - 2 * ${$width}px) calc(2 * ${$width}px),
    calc(100% - 3 * ${$width}px) calc(2 * ${$width}px),
    calc(100% - 3 * ${$width}px) ${$width}px,
    calc(100% - 5 * ${$width}px) ${$width}px,
    calc(100% - 5 * ${$width}px) 0px,
    calc(5 * ${$width}px) 0px,
    calc(5 * ${$width}px) ${$width}px,
    calc(3 * ${$width}px) ${$width}px,
    calc(3 * ${$width}px) calc(2 * ${$width}px),
    calc(2 * ${$width}px) calc(2 * ${$width}px),
    calc(2 * ${$width}px) calc(3 * ${$width}px),
        ${$width}px calc(3 * ${$width}px),
        ${$width}px calc(5 * ${$width}px),
    0px calc(5 * ${$width}px));

    &::after {
        clip-path: polygon(0px calc(100% - 5 * ${$width}px),
            ${$width}px calc(100% - 5 * ${$width}px),
            ${$width}px calc(100% - 3 * ${$width}px),
        calc(2 * ${$width}px) calc(100% - 3 * ${$width}px),
        calc(2 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(3 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(3 * ${$width}px) calc(100% - ${$width}px),
        calc(5 * ${$width}px) calc(100% - ${$width}px),
        calc(5 * ${$width}px) 100%,
        calc(100% - 5 * ${$width}px) 100%,
        calc(100% - 5 * ${$width}px) calc(100% - ${$width}px),
        calc(100% - 3 * ${$width}px) calc(100% - ${$width}px),
        calc(100% - 3 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(100% - 3 * ${$width}px),
        calc(100% - ${$width}px) calc(100% - 3 * ${$width}px),
        calc(100% - ${$width}px) calc(100% - 5 * ${$width}px),
        100% calc(100% - 5 * ${$width}px),
        100% calc(5 * ${$width}px),
        calc(100% - ${$width}px) calc(5 * ${$width}px),
        calc(100% - ${$width}px) calc(3 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(3 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(2 * ${$width}px),
        calc(100% - 3 * ${$width}px) calc(2 * ${$width}px),
        calc(100% - 3 * ${$width}px) ${$width}px,
        calc(100% - 5 * ${$width}px) ${$width}px,
        calc(100% - 5 * ${$width}px) 0px,
        calc(5 * ${$width}px) 0px,
        calc(5 * ${$width}px) ${$width}px,
        calc(3 * ${$width}px) ${$width}px,
        calc(3 * ${$width}px) calc(2 * ${$width}px),
        calc(2 * ${$width}px) calc(2 * ${$width}px),
        calc(2 * ${$width}px) calc(3 * ${$width}px),
            ${$width}px calc(3 * ${$width}px),
            ${$width}px calc(5 * ${$width}px),
        0px calc(5 * ${$width}px),
        0px 50%,
            ${$width}px 50%,
            ${$width}px calc(5 * ${$width}px),
        calc(2 * ${$width}px) calc(5 * ${$width}px),
        calc(2 * ${$width}px) calc(3 * ${$width}px),
        calc(3 * ${$width}px) calc(3 * ${$width}px),
        calc(3 * ${$width}px) calc(2 * ${$width}px),
        calc(5 * ${$width}px) calc(2 * ${$width}px),
        calc(5 * ${$width}px) ${$width}px,
        calc(100% - 5 * ${$width}px) ${$width}px,
        calc(100% - 5 * ${$width}px) calc(2 * ${$width}px),
        calc(100% - 3 * ${$width}px) calc(2 * ${$width}px),
        calc(100% - 3 * ${$width}px) calc(3 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(3 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(5 * ${$width}px),
        calc(100% - ${$width}px) calc(5 * ${$width}px),
        calc(100% - ${$width}px) calc(100% - 5 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(100% - 5 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(100% - 3 * ${$width}px),
        calc(100% - 3 * ${$width}px) calc(100% - 3 * ${$width}px),
        calc(100% - 3 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(100% - 5 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(100% - 5 * ${$width}px) calc(100% - ${$width}px),
        calc(5 * ${$width}px) calc(100% - ${$width}px),
        calc(5 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(3 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(3 * ${$width}px) calc(100% - 3 * ${$width}px),
        calc(2 * ${$width}px) calc(100% - calc(3 * ${$width}px)),
        calc(2 * ${$width}px) calc(100% - 5 * ${$width}px),
            ${$width}px calc(100% - 5 * ${$width}px),
            ${$width}px 50%,
        0px 50%);
    }
`;

const PixelCardCorner6Radius = ($width: number) => css`
    clip-path: polygon(0px calc(100% - 4 * ${$width}px),
        ${$width}px calc(100% - 4 * ${$width}px),
        ${$width}px calc(100% - 2 * ${$width}px),
    calc(2 * ${$width}px) calc(100% - 2 * ${$width}px),
    calc(2 * ${$width}px) calc(100% - ${$width}px),
    calc(4 * ${$width}px) calc(100% - ${$width}px),
    calc(4 * ${$width}px) 100%,
    calc(100% - 4 * ${$width}px) 100%,
    calc(100% - 4 * ${$width}px) calc(100% - ${$width}px),
    calc(100% - 2 * ${$width}px) calc(100% - ${$width}px),
    calc(100% - 2 * ${$width}px) calc(100% - 2 * ${$width}px),
    calc(100% - ${$width}px) calc(100% - 2 * ${$width}px),
    calc(100% - ${$width}px) calc(100% - 4 * ${$width}px),
    100% calc(100% - 4 * ${$width}px),
    100% calc(4 * ${$width}px),
    calc(100% - ${$width}px) calc(4 * ${$width}px),
    calc(100% - ${$width}px) calc(2 * ${$width}px),
    calc(100% - 2 * ${$width}px) calc(2 * ${$width}px),
    calc(100% - 2 * ${$width}px) ${$width}px,
    calc(100% - 4 * ${$width}px) ${$width}px,
    calc(100% - 4 * ${$width}px) 0px,
    calc(4 * ${$width}px) 0px,
    calc(4 * ${$width}px) ${$width}px,
    calc(2 * ${$width}px) ${$width}px,
    calc(2 * ${$width}px) calc(2 * ${$width}px),
        ${$width}px calc(2 * ${$width}px),
        ${$width}px calc(4 * ${$width}px),
    0px calc(4 * ${$width}px));

    &::after {
        clip-path: polygon(0px calc(100% - 4 * ${$width}px),
            ${$width}px calc(100% - 4 * ${$width}px),
            ${$width}px calc(100% - 2 * ${$width}px),
        calc(2 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(2 * ${$width}px) calc(100% - ${$width}px),
        calc(4 * ${$width}px) calc(100% - ${$width}px),
        calc(4 * ${$width}px) 100%,
        calc(100% - 4 * ${$width}px) 100%,
        calc(100% - 4 * ${$width}px) calc(100% - ${$width}px),
        calc(100% - 2 * ${$width}px) calc(100% - ${$width}px),
        calc(100% - 2 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(100% - ${$width}px) calc(100% - 2 * ${$width}px),
        calc(100% - ${$width}px) calc(100% - 4 * ${$width}px),
        100% calc(100% - 4 * ${$width}px),
        100% calc(4 * ${$width}px),
        calc(100% - ${$width}px) calc(4 * ${$width}px),
        calc(100% - ${$width}px) calc(2 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(2 * ${$width}px),
        calc(100% - 2 * ${$width}px) ${$width}px,
        calc(100% - 4 * ${$width}px) ${$width}px,
        calc(100% - 4 * ${$width}px) 0px,
        calc(4 * ${$width}px) 0px,
        calc(4 * ${$width}px) ${$width}px,
        calc(2 * ${$width}px) ${$width}px,
        calc(2 * ${$width}px) calc(2 * ${$width}px),
            ${$width}px calc(2 * ${$width}px),
            ${$width}px calc(4 * ${$width}px),
        0px calc(4 * ${$width}px),
        0px 50%,
            ${$width}px 50%,
            ${$width}px calc(4 * ${$width}px),
        calc(2 * ${$width}px) calc(4 * ${$width}px),
        calc(2 * ${$width}px) calc(2 * ${$width}px),
        calc(4 * ${$width}px) calc(2 * ${$width}px),
        calc(4 * ${$width}px) ${$width}px,
        calc(100% - 4 * ${$width}px) ${$width}px,
        calc(100% - 4 * ${$width}px) calc(2 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(2 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(4 * ${$width}px),
        calc(100% - ${$width}px) calc(4 * ${$width}px),
        calc(100% - ${$width}px) calc(100% - 4 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(100% - 4 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(100% - 4 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(100% - 4 * ${$width}px) calc(100% - ${$width}px),
        calc(4 * ${$width}px) calc(100% - ${$width}px),
        calc(4 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(2 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(2 * ${$width}px) calc(100% - 4 * ${$width}px),
            ${$width}px calc(100% - 4 * ${$width}px),
            ${$width}px 50%,
        0px 50%);
    }
`;

const PixelCardCorner4Radius = ($width: number) => css`
    clip-path: polygon(0px calc(100% - 2 * ${$width}px),
        ${$width}px calc(100% - 2 * ${$width}px),
        ${$width}px calc(100% - ${$width}px),
    calc(2 * ${$width}px) calc(100% - ${$width}px),
    calc(2 * ${$width}px) 100%,
    calc(100% - 2 * ${$width}px) 100%,
    calc(100% - 2 * ${$width}px) calc(100% - ${$width}px),
    calc(100% - ${$width}px) calc(100% - ${$width}px),
    calc(100% - ${$width}px) calc(100% - 2 * ${$width}px),
    100% calc(100% - 2 * ${$width}px),
    100% calc(2 * ${$width}px),
    calc(100% - ${$width}px) calc(2 * ${$width}px),
    calc(100% - ${$width}px) ${$width}px,
    calc(100% - 2 * ${$width}px) ${$width}px,
    calc(100% - 2 * ${$width}px) 0px,
    calc(2 * ${$width}px) 0px,
    calc(2 * ${$width}px) ${$width}px,
        ${$width}px ${$width}px,
        ${$width}px calc(2 * ${$width}px),
    0px calc(2 * ${$width}px));

    &::after {
        clip-path: polygon(0px calc(100% - 2 * ${$width}px),
            ${$width}px calc(100% - 2 * ${$width}px),
            ${$width}px calc(100% - ${$width}px),
        calc(2 * ${$width}px) calc(100% - ${$width}px),
        calc(2 * ${$width}px) 100%,
        calc(100% - 2 * ${$width}px) 100%,
        calc(100% - 2 * ${$width}px) calc(100% - ${$width}px),
        calc(100% - ${$width}px) calc(100% - ${$width}px),
        calc(100% - ${$width}px) calc(100% - 2 * ${$width}px),
        100% calc(100% - 2 * ${$width}px),
        100% calc(2 * ${$width}px),
        calc(100% - ${$width}px) calc(2 * ${$width}px),
        calc(100% - ${$width}px) ${$width}px,
        calc(100% - 2 * ${$width}px) ${$width}px,
        calc(100% - 2 * ${$width}px) 0px,
        calc(2 * ${$width}px) 0px,
        calc(2 * ${$width}px) ${$width}px,
            ${$width}px ${$width}px,
            ${$width}px calc(2 * ${$width}px),
        0px calc(2 * ${$width}px),
        0px 50%,
            ${$width}px 50%,
            ${$width}px calc(2 * ${$width}px),
        calc(2 * ${$width}px) calc(2 * ${$width}px),
        calc(2 * ${$width}px) ${$width}px,
        calc(100% - 2 * ${$width}px) ${$width}px,
        calc(100% - 2 * ${$width}px) calc(2 * ${$width}px),
        calc(100% - ${$width}px) calc(2 * ${$width}px),
        calc(100% - ${$width}px) calc(100% - 2 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(100% - 2 * ${$width}px),
        calc(100% - 2 * ${$width}px) calc(100% - ${$width}px),
        calc(2 * ${$width}px) calc(100% - ${$width}px),
        calc(2 * ${$width}px) calc(100% - 2 * ${$width}px),
            ${$width}px calc(100% - 2 * ${$width}px),
            ${$width}px 50%,
        0px 50%);
    }
`;

const PixelCardCorner2Radius = ($width: number) => css`
    clip-path: polygon(0px calc(100% - ${$width}px),
        ${$width}px calc(100% - ${$width}px),
        ${$width}px 100%,
    calc(100% - ${$width}px) 100%,
    calc(100% - ${$width}px) calc(100% - ${$width}px),
    100% calc(100% - ${$width}px),
    100% ${$width}px,
    calc(100% - ${$width}px) ${$width}px,
    calc(100% - ${$width}px) 0px,
        ${$width}px 0px,
        ${$width}px ${$width}px,
    0px ${$width}px);

    &::after {
        clip-path: polygon(0px calc(100% - ${$width}px),
            ${$width}px calc(100% - ${$width}px),
            ${$width}px 100%,
        calc(100% - ${$width}px) 100%,
        calc(100% - ${$width}px) calc(100% - ${$width}px),
        100% calc(100% - ${$width}px),
        100% ${$width}px,
        calc(100% - ${$width}px) ${$width}px,
        calc(100% - ${$width}px) 0px,
            ${$width}px 0px,
            ${$width}px ${$width}px,
        0px ${$width}px,
        0px 50%,
            ${$width}px 50%,
            ${$width}px ${$width}px,
        calc(100% - ${$width}px) ${$width}px,
        calc(100% - ${$width}px) calc(100% - ${$width}px),
            ${$width}px calc(100% - ${$width}px),
            ${$width}px 50%,
        0px 50%);
    }
`;

const PIXEL_CARD_PATH_SIZES_MAP: Record<CornerSizeType, ($width: number) => ReturnType<typeof css>> = {
    10: PixelCardCorner10Radius,
    8: PixelCardCorner8Radius,
    6: PixelCardCorner6Radius,
    4: PixelCardCorner4Radius,
    2: PixelCardCorner2Radius,
};

type CornerSizeMapType = Record<CornerSizeType, ReturnType<typeof css>>;
type CornerWidthMapType = Record<CornerWidthType, CornerSizeMapType>;

const CornerWidthAndSizeMap = ((): CornerWidthMapType => CORNER_WIDTH.reduce((accWidth: CornerWidthMapType, width) => {
    accWidth[width] = CORNER_SIZE.reduce((accSize: CornerSizeMapType, size) => {
        accSize[size] = PIXEL_CARD_PATH_SIZES_MAP[size](width);

        return accSize;
    }, {} as CornerSizeMapType)

    return accWidth;
}, {} as CornerWidthMapType))();

export const getPixelCardPathBySizeStyle = ({$size, $width = 4}: {
    $size?: CornerSizeType;
    $width?: CornerWidthType;
}): ReturnType<typeof css> => {
    const size = $size ?? 8;
    const width = $width ?? 4;

    return CornerWidthAndSizeMap[width][size] ?? CornerWidthAndSizeMap[4][8];
}

export const PixelCardStyled = styled.div.attrs<{"data-pixel-card": string}>({"data-pixel-card": ""})<{ $color?: string; $size?: CornerSizeType; $width?: CornerWidthType; }>`
    ${getPixelCardPathBySizeStyle};

    &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: ${({$color}) => $color ?? 'black'};
        display: block;
        pointer-events: none;
        transition: background 0.4s ease;
    }
`;

const Corner10Radius = css<{ $width?: number }>`
    border: none;
    border-radius: calc(7 * ${({$width = 4}) => $width}px);
`;

const Corner8Radius = css<{ $width?: number }>`
    border: none;
    border-radius: calc(5 * ${({$width = 4}) => $width}px);
`;

const Corner6Radius = css<{ $width?: number }>`
    border: none;
    border-radius: calc(4 * ${({$width = 4}) => $width}px);
`;

const Corner4Radius = css<{ $width?: number }>`
    border: none;
    border-radius: calc(2 * ${({$width = 4}) => $width}px);
`;

const Corner2Radius = css<{ $width?: number }>`
    border: none;
    border-radius: ${({$width = 4}) => $width}px;
`;

const PIXEL_CARD_CORNER_SIZES_MAP: CornerSizeMapType = {
    10: Corner10Radius,
    8: Corner8Radius,
    6: Corner6Radius,
    4: Corner4Radius,
    2: Corner2Radius,
};

export const getPixelCardCornerBySizeStyle = ({$size}: {
    $size?: CornerSizeType;
    $width?: number;
}): ReturnType<typeof css> => {
    return PIXEL_CARD_CORNER_SIZES_MAP[$size ?? 8] ?? PIXEL_CARD_CORNER_SIZES_MAP[8];
}