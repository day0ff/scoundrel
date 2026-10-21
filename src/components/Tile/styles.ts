import styled from "styled-components";

export const TileStyled = styled.div<{$imageUrl: string; $indent: number | string; $cornerRadius: number | string}>`
    position: relative;
    isolation: isolate;

    &::before {
        content: "";
        position: absolute;
        z-index: -1;
        inset: ${({$indent}) => typeof $indent === "number" ? `${$indent}px` : $indent};
        border-radius: ${({$cornerRadius}) => typeof $cornerRadius === "number" ? `${$cornerRadius}px` : $cornerRadius};
        background-image: url("${({$imageUrl}) => $imageUrl}");
        background-repeat: repeat;
        pointer-events: none;
    }
`;
