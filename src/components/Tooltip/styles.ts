import styled from "styled-components";

export const TooltipStyled = styled.span<{ $maxWidth?: string; $minWidth?: string}>`
    display: inline-block;
    cursor: help;

    & [data-tippy-root] {
        cursor: default;
    }

    & .tippy-content {
        padding: 10px 24px;
    }

    & .tippy-box {
        ${({$maxWidth}) => $maxWidth && `max-width: ${$maxWidth} !important;`};
        ${({$minWidth}) => $minWidth && `min-width: ${$minWidth} !important;`};
    }
`;
