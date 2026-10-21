import {css} from "styled-components";

export const TextStrokeStyle = css<{$color?: string}>`
    text-shadow: ${({$color = 'black'}) => `-1px -1px 0 ${$color}, -1px 2px 0 ${$color}, 1px -1px 0 ${$color}, 1px 1px 0 ${$color}`};
`;

export const getColoredTextStrokeStyle = (color: string, size = 1) => css`
    text-shadow: -${size}px -${size}px 0 ${color}, -${size}px 2px 0 ${color}, ${size}px -${size}px 0 ${color}, ${size}px ${size}px 0 ${color};
`;
